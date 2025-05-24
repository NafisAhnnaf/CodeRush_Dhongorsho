# Product Price Range Predictor

This project uses AI to predict price ranges for products based on similar items in a database. It utilizes Google's Gemini AI model and vector similarity search to provide accurate minimum and maximum price predictions.

## Features

- AI-powered price range prediction
- Vector similarity search for finding comparable products
- Simple command-line interface
- Automated min-max price estimation

## Requirements

- Python 3.8+
- Google Cloud credentials (for Gemini AI and Vertex AI)
- Required Python packages (see requirements.txt)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NafisAhnnaf/CodeRush_Dhongorsho.git
cd CodeRush_Dhongorsho
```

2. Install required packages:
```bash
pip install -r requirements.txt
```

3. Set up your environment variables:
Create a `.env` file with your Google Cloud credentials.

4. Prepare your product data:
Place your product data in `uploads/products.txt`

## Usage

Run the main script:
```bash
python main.py
```

When prompted, enter the product details you want to price. The system will return a predicted price range based on similar products in the database.

## Project Structure

- `main.py`: Main entry point and user interface
- `call_llm.py`: AI model interaction and price prediction logic
- `create_vector_db.py`: Vector database management
- `get_embedding.py`: Text embedding functionality
- `requirements.txt`: Project dependencies

## Contributing

Feel free to submit issues and enhancement requests!

## License

[MIT License](LICENSE) 