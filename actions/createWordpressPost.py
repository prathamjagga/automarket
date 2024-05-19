import requests
import sys
import json
import base64

try:
    input_json = json.loads(sys.argv[1])
    username = input_json["username"]
    pswd = input_json["password"]

    sample_string = f"{username}:{pswd}"
    sample_string_bytes = sample_string.encode("ascii") 
    base64_bytes = base64.b64encode(sample_string_bytes) 
    base64_string = base64_bytes.decode("ascii") 
    wordpress_url = input_json["wordpress_url"]

    post_title = input_json["post_title"]
    post_content = input_json["post_content"]
    
    response =requests.post(f"{wordpress_url}/wp-json/wp/v2/posts",headers={"Authorization": f"Basic {base64_string}"}, json={
        "title":post_title,
        "content":post_content,
        "status":"publish"
    } )
    print(json.dumps({"output": {"type": "text", "content": "success"}}))

except Exception as e:
    print(json.dumps({"output": {"type": "error", "content":"error"}}))
