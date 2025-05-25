import os
import json
from create_vector_db import initialize_chroma
from call_llm import query_rag

json_file_path = './uploads/prediction.json'

def delete_db():
    print("Deleting existing db folder, if any\n")
    db_folder_path = './db'
    
    # Check if the 'db' folder exists
    if os.path.exists(db_folder_path) and os.path.isdir(db_folder_path):
        # Recursively delete the contents of the 'db' folder
        for root, dirs, files in os.walk(db_folder_path, topdown=False):
            for file in files:
                # Skip files that start with '._'
                if file.startswith('._'):
                    print(f"Skipping AppleDouble file: {file}")
                    continue
                file_path = os.path.join(root, file)
                os.remove(file_path)  # Delete files
            for dir in dirs:
                dir_path = os.path.join(root, dir)
                os.rmdir(dir_path)  # Delete subdirectories
        
        # Delete the main 'db' folder
        os.rmdir(db_folder_path)
        print(f"The 'db' folder at {db_folder_path} has been deleted.")
    else:
        print(f"The 'db' folder at {db_folder_path} does not exist.")


def main():
    initialize_chroma()
    query_rag()
    delete_db()



