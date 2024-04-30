import requests

username = "demo"
pswd = ""


response =requests.post("https://s-q3kh9vckzqmyl.eu1.wpsandbox.org/wp-json/wp/v2/posts",headers={"Authorization": "Basic "}, json={
    "title":"automarket demo",
    "content":"automarket demo",
    "status":"publish"
} )


print(response)