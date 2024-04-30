import sys

def find_occurrences(text, keyword):
    occurrences = text.lower().count(keyword.lower())
    return occurrences

text = sys.argv[1]
keyword = sys.argv[2]

num_occurrences = find_occurrences(text, keyword)
print(f"The keyword '{keyword}' occurs {num_occurrences} times in the text.")
