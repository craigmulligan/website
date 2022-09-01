import urllib.request
import csv

url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBqec4IEfgDZG8Tpv715dZlN6C1YMrPTfJg7PFq2y858Prmw51uMnNsBPAdN40tW_WNG0KDi0Kvlgi/pub?gid=295678645&single=true&output=csv"
header = """
---
title: "Books"
description: "A list of books I've read and some I recommend."
---
# Bookshelf 

Below is a ordered list of some of the books I've read. I've highlighted ones that I'd recommend.
""".strip()


contents = urllib.request.urlopen(url).read()
reader = csv.reader(contents.decode("utf-8").splitlines())

with open("content/books.md", "w+") as file:
    file.seek(0)
    file.write(header)
    file.write("\n")

    for row in reader:
        if row[5] == "EBOOK": 
            item = f"<a href='{row[3]}' target='blank'>{row[1]} - {row[2]}</a>" 
            if int(row[8]) > 0:
                item = "<mark>" + item + "</mark>"
           
            file.write("- ")
            file.write(item)
            file.write("\n")
