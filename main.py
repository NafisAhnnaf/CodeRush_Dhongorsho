import os
from create_vector_db import initialize_chroma
from call_llm import query_rag


def main():
    # Initialize the vector database with product data
    initialize_chroma()
    
    # Get product description from user
    print("\nProduct Price Range Predictor")
    print("============================")
    print("Please enter the product details:")
    product_description = input("> ")
    
    # Get price prediction
    try:
        min_val, max_val = query_rag(product_description)
        
        if min_val == 0.0 and max_val == 0.0:
            print("\nError: Could not determine price range for the product")
        else:
            print("\nPrice Range Prediction:")
            print("----------------------")
            print(f"Minimum Price: ${min_val:.2f}")
            print(f"Maximum Price: ${max_val:.2f}")
            
    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")

if __name__ == "__main__":
    main()
