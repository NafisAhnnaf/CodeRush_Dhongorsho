import os
import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from get_embedding import get_embedding_func

from get_embedding import get_embedding_func
from create_vector_db import db

load_dotenv()

template = """
Based on the following similar products and their prices, predict a suitable price range for the target product.

Similar Products Data:
{context}

Target Product Details:
{target_product}

Instructions:
1. Analyze the prices of the similar products provided
2. Consider the features, specifications, and condition of both similar products and target product
3. Predict a suitable price range for the target product
4. Return ONLY a JSON with the following format:
{{
    "predicted_price": float,  # Your best estimate of the product's value
    "min_val": float,         # Minimum recommended price
    "max_val": float,         # Maximum recommended price
    "confidence": string      # "high", "medium", or "low"
}}

Only provide the JSON output, no additional text or explanation.
"""

# def query_rag():
#     # Find similar products
#     results = db.similarity_search_with_score(target_product, k=10)
#     context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
#     prompt_template = ChatPromptTemplate.from_template(template)
#     prompt = prompt_template.format(
#         context=context_text,
#         target_product=target_product
#     )

#     llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
#     response_text = llm.invoke(prompt)

#     try:
#         # Parse the response to ensure it's valid JSON
#         response_data = json.loads(response_text.content)
        
#         # Extract values with proper error handling
#         predicted_price = float(response_data.get('predicted_price', 0.0))
#         min_val = float(response_data.get('min_val', 0.0))
#         max_val = float(response_data.get('max_val', 0.0))
#         confidence = str(response_data.get('confidence', 'low'))
        
#         return predicted_price, min_val, max_val, confidence
        
#     except (json.JSONDecodeError, KeyError, ValueError) as e:
#         print(f"Error processing response: {str(e)}")
#         print(f"Raw response: {response_text.content}")
#         return 0.0, 0.0, 0.0, "low"  


def read_target_product():
    with open('uploads/target_product.txt', 'r') as f:
        return f.read()


target_product_str = read_target_product()


def query_rag():
    PROMPT_TEMPLATE = template
    query_text = "Only provide the required output"
    results = db.similarity_search_with_score(query_text, k=25)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)

    prompt = prompt_template.format(
        context=context_text,
        target_product = target_product_str
    )

    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.8)

    response_text = llm.invoke(prompt)

    output_dir = "./output"
    output_file_path = os.path.join(output_dir, "prediction.json")

    response_data = response_text.content

    with open(output_file_path, "w", encoding="utf-8") as json_file:
      json_file.write(str(response_data))

    print(f"Response data saved to {output_file_path}")

    return response_text



if __name__ == "__main__":
    query_rag()


