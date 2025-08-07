
✅ Solution: Import the existing repo and manually delete it via CDK
To work around this without needing manual permissions, do the following:

✅ Step-by-Step: Delete orphaned ECR repo via CDK
Import the existing ECR repo into CDK (read-only)

Use a custom resource (Lambda or SDK call) to delete it

Or: adopt it into CloudFormation using CfnRepository
