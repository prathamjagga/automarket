def get_output(input_json):
    try:
        import requests
        import json
        from craiyon import Craiyon
        generator = Craiyon() # Instantiates the api wrapper
        result = generator.generate(input_json['prompt'], negative_prompt="spoon", model_type="art")
        print(type(result[0]))
        a = (json.dumps({"output": {"type": "text", "content": f"{result.images[0]}"}}))
        return a
    except Exception as e:
        return(json.dumps({"output": {"type": "error", "content": str(e)}}))
        