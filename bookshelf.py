import urllib.request
import csv
import io

url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBqec4IEfgDZG8Tpv715dZlN6C1YMrPTfJg7PFq2y858Prmw51uMnNsBPAdN40tW_WNG0KDi0Kvlgi/pub?gid=295678645&single=true&output=csv"
header = """
---
title: "Books"
description: "A list of books I've read and some I recommend."
---
# Bookshelf 

Some of the books I've read. I've highlighted ones that I'd recommend.
""".strip()


contents = urllib.request.urlopen(url).read()

reader = csv.DictReader(io.StringIO(contents.decode("utf-8")))

with open("content/books.md", "w+") as file:
    file.seek(0)
    file.write(header)
    file.write("\n")

    for row in reader:
        item = f"<a href='http://www.amazon.co.uk/dp/{row['ASIN']}' target='blank'>{row['Title']} - {row['Author']}</a>"
        if int(row["Recommend"]) > 0:
            item = "<mark>" + item + "</mark>"

        file.write("- ")
        file.write(item)
        file.write("\n")
