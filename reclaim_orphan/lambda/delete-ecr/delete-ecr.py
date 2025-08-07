import boto3

def lambda_handler(event, context):
    repo_name = 'your-repo-name'
    ecr = boto3.client('ecr')
    
    try:
        # Delete all images first (if any)
        images = ecr.list_images(repositoryName=repo_name)
        if images['imageIds']:
            ecr.batch_delete_image(repositoryName=repo_name, imageIds=images['imageIds'])
        
        # Now delete the repo
        ecr.delete_repository(repositoryName=repo_name, force=True)
        return {"status": "success", "message": f"Deleted repo {repo_name}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
