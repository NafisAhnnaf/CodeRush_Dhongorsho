import os
import json
from dotenv import load_dotenv
from google.cloud import vision
from typing import List, Dict, Optional

# Load environment variables
load_dotenv()

class ProductResaleAssessor:
    def __init__(self):
        """Initialize Google Vision client."""
        self.client = vision.ImageAnnotatorClient()

    def analyze_product(self, image_path: str, product_type: Optional[str] = None) -> Dict:
        """
        Analyzes a product image for resale condition.
        
        Args:
            image_path (str): Path to the product image.
            product_type (str): Optional product type (e.g., "phone", "laptop")
            
        Returns:
            Dict: Analysis results including condition and value estimate
        """
        try:
            with open(image_path, "rb") as img_file:
                content = img_file.read()
            
            image = vision.Image(content=content)
            response = self.client.label_detection(image=image)
            labels = [{"description": label.description.lower(), "score": label.score} 
                     for label in response.label_annotations]
            
            # Simplified condition assessment
            condition = self._assess_condition(labels)
            value_estimate = self._estimate_value(condition, product_type)
            
            return {
                "status": "success",
                "product_type": product_type or self._detect_product_type(labels),
                "condition": condition,
                "condition_description": self._get_condition_description(condition),
                "value_estimate": value_estimate,
                "confidence": max([label["score"] for label in labels], default=0)
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    def _assess_condition(self, labels: List[Dict]) -> int:
        """Determine condition rating from 1-5 based on labels"""
        damage_terms = ["crack", "broken", "scratch", "dent", "damage"]
        positive_terms = ["new", "mint", "perfect", "excellent"]
        
        damage_score = sum(
            label["score"] for label in labels
            if any(term in label["description"] for term in damage_terms)
        )
        
        positive_score = sum(
            label["score"] for label in labels
            if any(term in label["description"] for term in positive_terms)
        )
        
        if positive_score > 0.8 and damage_score < 0.2:
            return 5
        elif damage_score < 0.4:
            return 4
        elif damage_score < 0.7:
            return 3
        elif damage_score < 1.0:
            return 2
        else:
            return 1

    def _estimate_value(self, condition: int, product_type: Optional[str]) -> str:
        """Estimate resale value based on condition"""
        value_ranges = {
            "phone": [15, 30, 50, 75, 90],
            "laptop": [20, 35, 55, 80, 95],
        }.get(product_type, [10, 25, 45, 70, 85])
        
        lower = value_ranges[condition-1]
        upper = value_ranges[condition] if condition < 5 else 100
        return f"{lower}-{upper}% of original value"

    def _get_condition_description(self, condition: int) -> str:
        """Get human-readable condition description"""
        descriptions = {
            1: "Heavily damaged or non-functional",
            2: "Poor condition with significant damage",
            3: "Fair condition with visible wear",
            4: "Good condition with minor wear",
            5: "Like new condition"
        }
        return descriptions.get(condition, "Unknown condition")

    def _detect_product_type(self, labels: List[Dict]) -> str:
        """Attempt to determine product type from labels"""
        product_types = {
            "phone": ["phone", "smartphone", "iphone", "android"],
            "laptop": ["laptop", "notebook", "macbook", "chromebook"],
            "camera": ["camera", "dslr", "mirrorless"]
        }
        
        for label in labels:
            for ptype, terms in product_types.items():
                if any(term in label["description"] for term in terms):
                    return ptype
        return "unknown"

def process_images(image_dir: str, output_file: str = "analysis.json") -> bool:
    """
    Process all images in directory and save results.
    
    Args:
        image_dir: Directory containing product images
        output_file: Path to output JSON file
        
    Returns:
        bool: True if processing succeeded, False otherwise
    """
    assessor = ProductResaleAssessor()
    image_files = [
        f for f in os.listdir(image_dir)
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
    ]
    
    if not image_files:
        print(f"No images found in {image_dir}")
        return False
    
    results = {
        "products": [],
        "summary": {
            "total_images": len(image_files),
            "successful_analyses": 0,
            "average_condition": 0,
            "average_value": 0,
            "condition_distribution": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            "avg-resale-price": 0
        }
    }
    
    total_condition = 0
    total_value = 0
    
    for img_file in image_files:
        img_path = os.path.join(image_dir, img_file)
        analysis = assessor.analyze_product(img_path)
        
        if analysis["status"] == "success":
            value_range = analysis["value_estimate"].split("-")[0].strip("% ")
            avg_value = float(value_range) + 5  # Midpoint of range
            
            product_data = {
                "image": img_file,
                "product_type": analysis["product_type"],
                "condition": analysis["condition"],
                "condition_description": analysis["condition_description"],
                "value_estimate": analysis["value_estimate"],
                "confidence": analysis["confidence"]
            }
            
            results["products"].append(product_data)
            results["summary"]["successful_analyses"] += 1
            results["summary"]["condition_distribution"][analysis["condition"]] += 1
            total_condition += analysis["condition"]
            total_value += avg_value
    
    if results["summary"]["successful_analyses"] > 0:
        results["summary"]["average_condition"] = round(
            total_condition / results["summary"]["successful_analyses"], 1
        )
        results["summary"]["average_value"] = round(
            total_value / results["summary"]["successful_analyses"], 1
        )
    
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"Analysis complete. Results saved to {output_file}")
    print_summary(results["summary"])
    return True

def print_summary(summary: Dict):
    """Print human-readable summary of results"""
    print("\n=== SUMMARY ===")
    print(f"Total images processed: {summary['total_images']}")
    print(f"Successfully analyzed: {summary['successful_analyses']}")
    print(f"Average condition: {summary['average_condition']}/5")
    print(f"Average resale value: {summary['average_value']}% of original")
    
    print("\nCondition Distribution:")
    for cond, count in summary["condition_distribution"].items():
        print(f"  {cond}/5: {count} items")

def main():
    """Main execution function"""
    image_dir = "images"
    if not os.path.exists(image_dir):
        print(f"Directory not found: {image_dir}")
        return
    
    success = process_images(image_dir)
    if not success:
        print("No valid images were processed")

if __name__ == "__main__":
    main()



