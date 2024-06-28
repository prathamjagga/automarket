def get_output():
    import tweepy
    import json
    # Replace these with your own credentials
    api_key = "YOUR_API_KEY"
    api_secret = "YOUR_API_SECRET"
    access_token = "YOUR_ACCESS_TOKEN"
    access_token_secret = "YOUR_ACCESS_TOKEN_SECRET"

    # Authenticate to Twitter
    auth = tweepy.OAuth1UserHandler(api_key, api_secret, access_token, access_token_secret)
    api = tweepy.API(auth)

    # Verify the credentials
    try:
        api.verify_credentials()
        json.dumps("Authentication OK")
    except Exception as e:
        print(f"Error during authentication: {e}")

    # Create a tweet
    tweet = "Hello, world! This is a tweet from Tweepy."

    try:
        api.update_status(tweet)
        json.dumps("Tweet successfully posted")
    except Exception as e:
        json.dumps(f"Error: {e}")
