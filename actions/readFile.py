import sys
import urllib.request

def read_file_from_url(url):
    try:
        # Add a user-agent header to the request
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        # Open the URL and read the contents
        with urllib.request.urlopen(req) as response:
            data = response.read().decode('utf-8')
            return data
    except Exception as e:
        print("Error:", e)
        return None

if __name__ == "__main__":
    # Check if URL is provided as command-line argument
    if len(sys.argv) != 2:
        print("Usage: python program.py <file_url>")
        sys.exit(1)

    file_url = sys.argv[1]
    file_contents = read_file_from_url(file_url)

    if file_contents:
        print("Contents of the file from URL:", file_url)
        print(file_contents)
