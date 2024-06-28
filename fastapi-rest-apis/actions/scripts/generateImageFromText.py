def get_output(input_json):
    try:
        import requests
        import json
        from craiyon import Craiyon
        generator = Craiyon() # Instantiates the api wrapper
        result = generator.generate(input_json["prompt"], negative_prompt="spoon", model_type="art")
        print(json.dumps({"output": {"type": "text", "content": f"{result.description}"}}))
    except Exception as e:
        print(json.dumps({"output": {"type": "error", "content": e}}))
        