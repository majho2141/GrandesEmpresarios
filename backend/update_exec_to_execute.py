import os
import re

def replace_exec_with_execute(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Reemplazar .exec( por .execute(
    modified_content = re.sub(r'\.exec\(', '.execute(', content)
    
    if content != modified_content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(modified_content)
        print(f"Actualizado: {file_path}")
    else:
        print(f"No se requirieron cambios: {file_path}")

def update_all_crud_files():
    crud_dir = os.path.join('src', 'crud')
    for filename in os.listdir(crud_dir):
        if filename.endswith('.py'):
            file_path = os.path.join(crud_dir, filename)
            replace_exec_with_execute(file_path)

if __name__ == "__main__":
    update_all_crud_files()
    print("Conversión completada.") 