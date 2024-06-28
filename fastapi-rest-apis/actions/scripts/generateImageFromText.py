def get_output():
    try:
        import requests
        import json
        from craiyon import Craiyon
        generator = Craiyon() # Instantiates the api wrapper
        result = generator.generate("Photorealistic image of shrek eating earth", negative_prompt="spoon", model_type="art")
        print(json.dumps({"output": {"type": "text", "content": f"{result.description}"}}))
    except Exception as e:
        print(json.dumps({"output": {"type": "error", "content": e}}))
        