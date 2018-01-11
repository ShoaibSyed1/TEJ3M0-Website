import os
import re
import sys
import toml

REG_TEMPL = r"\{{2}\w+\}{2}"

def apply_template(template, page):
    matches = re.findall(REG_TEMPL, page)
    matches = list(map(lambda x: x.replace("{", "").replace("}", ""), matches))

    for match in matches:
        replacer = template[match]
        page = page.replace("{{" + match + "}}", replacer)
    
    return page

template = None
with open(sys.argv[1]) as file:
    template = toml.load(file)

pages = filter(lambda x: x.endswith(".html"), os.listdir(sys.argv[2]))

for page_path in pages:
    page = ""
    with open(page_path) as file:
        page = file.read()

    new_page = apply_template(template, page)

    with open(sys.argv[3] + page_path, 'w') as file:
        file.write(new_page)