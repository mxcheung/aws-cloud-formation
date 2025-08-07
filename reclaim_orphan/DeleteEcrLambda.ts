import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

const fn = new lambda.Function(this, 'DeleteEcrLambda', {
  runtime: lambda.Runtime.PYTHON_3_11,
  code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')), // Folder contains delete_ecr.py
  handler: 'delete_ecr.lambda_handler',
  environment: {
    REPOSITORY_NAME: 'your-repo-name', // Or inject dynamically
  },
  timeout: Duration.seconds(30),
});

// Grant permissions to delete ECR repos
fn.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    "ecr:DeleteRepository",
    "ecr:DescribeRepositories"
  ],
  resources: ["*"] // Or restrict to specific ARN
}));
