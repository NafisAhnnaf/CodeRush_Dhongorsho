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
Based on the following product data, determine the minimum and maximum price range for the target product.

Context (Similar Products):
{context}

Target Product Description: {target_product}

Instructions:
1. Analyze the prices of similar products in the context
2. Consider the features and specifications of the target product
3. Return ONLY a JSON with the following format:
{
    "min_val": float,
    "max_val": float
}

Only provide the JSON output, no additional text or explanation.
"""

def query_rag(target_product: str) -> tuple[float, float]:
    """
    Get min and max price values for a given product based on similar products.
    
    Args:
        target_product (str): Description of the product to price
        
    Returns:
        tuple[float, float]: A tuple containing (min_val, max_val)
    """
    PROMPT_TEMPLATE = template
    # Search for similar products
    results = db.similarity_search_with_score(target_product, k=10)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(
        context=context_text,
        target_product=target_product
    )

    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
    response_text = llm.invoke(prompt)

    try:
        # Parse the response to ensure it's valid JSON
        response_data = json.loads(response_text.content)
        
        # Extract min and max values
        min_val = float(response_data['min_val'])
        max_val = float(response_data['max_val'])
        
        return min_val, max_val
        
    except (json.JSONDecodeError, KeyError, ValueError) as e:
        print(f"Error processing response: {str(e)}")
        print(f"Raw response: {response_text.content}")
        return 0.0, 0.0  # Return default values in case of error
