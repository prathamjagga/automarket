import requests
import sys
import json

try:
    input_json = json.loads(sys.argv[1])
    username = input_json["username"]
    pswd = input_json["password"]
    wordpress_url = input_json["wordpress_url"]
    post_title = input_json["post_title"]
    post_content = input_json["post_content"]
    response =requests.post(f"{wordpress_url}/wp-json/wp/v2/posts",headers={"Authorization": "Basic "}, json={
        "title":post_title,
        "content":post_content,
        "status":"publish"
    } )
    print({"output": {"type": "tezt", "content": "success"}})


except Exception as e:
    print({"output": {"type": "error", "content": e}})
