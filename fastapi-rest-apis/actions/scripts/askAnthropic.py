anthropic_key = ""
import anthropic

anthropic.Anthropic(api_key=anthropic_key).messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, world"}
    ]
)

