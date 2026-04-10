import os
import shutil
import re

base_dir = r"c:\Users\rxtil\OneDrive\Desktop\stitch"
directories = {
    "home_blitz_studio": "index.html",
    "about_blitz_studio": "about.html",
    "services_blitz_studio": "services.html",
    "work_blitz_studio": "work.html",
    "contact_blitz_studio": "contact.html",
    "case_study_detail_blitz_studio": "case_study.html"
}

def update_links(html_content):
    # Fix Nav Links
    html_content = re.sub(r'href="#"([^>]*>)\s*Services\s*<', r'href="services.html"\1Services<', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'href="#"([^>]*>)\s*Projects\s*<', r'href="work.html"\1Projects<', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'href="#"([^>]*>)\s*About\s*<', r'href="about.html"\1About<', html_content, flags=re.IGNORECASE)
    html_content = re.sub(r'href="#"([^>]*>)\s*Contact\s*<', r'href="contact.html"\1Contact<', html_content, flags=re.IGNORECASE)
    
    # Fix buttons / loose textual links that might be a href="#" or an actual button
    # Wait, simple href replacator:
    # Let's replace href="#" with the correct links where we can detect them easily.
    
    # Replace BLITZ text logo with index block
    html_content = re.sub(r'<div class="([^"]*)">BLITZ</div>', r'<a href="index.html" class="\1">BLITZ</a>', html_content)
    
    return html_content

for d, filename in directories.items():
    dir_path = os.path.join(base_dir, d)
    if not os.path.exists(dir_path):
        continue
    
    code_file = os.path.join(dir_path, "code.html")
    if os.path.exists(code_file):
        with open(code_file, "r", encoding="utf-8") as f:
            content = f.read()
            
        content = update_links(content)
        
        out_file = os.path.join(base_dir, filename)
        with open(out_file, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"Migrated {d}/code.html -> {filename}")

# Clean up directories
for d in directories.keys():
    dir_path = os.path.join(base_dir, d)
    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)
        print(f"Removed directory: {dir_path}")

print("Migration complete!")
