import requests
import json

headers = {
    "authorization": "sk-08E5HZ0aWEJC4vtpfZXaIfYbZxGsRCA5HREBDX0GLvpv6o4n"
}

response = requests.post("https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", headers=headers, json={
  "cfg_scale": 7,
  "height": 512,
  "width": 512,
  "sampler": "K_DPM_2_ANCESTRAL",
  "samples": 1,
  "steps": 30,
  "text_prompts": [
    {
      "text": "A lighthouse on a cliff",
      "weight": 1
    }
  ]
})

print(response)