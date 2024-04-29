import boto3

def upload_file_to_s3(file_path, bucket_name, object_name):
    # Initialize S3 client
    s3_client = boto3.client('s3')

    try:
        s3_client.upload_file(file_path, bucket_name, object_name)
        print("File uploaded successfully to S3 bucket:", bucket_name)
    except Exception as e:
        print("Error uploading file to S3:", e)


file_path = input("Enter the local file path: ")
bucket_name = input("Enter the S3 bucket name: ")
object_name = input("Enter the object name (key) in the S3 bucket: ")

upload_file_to_s3(file_path, bucket_name, object_name)  