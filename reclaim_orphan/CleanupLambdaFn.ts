import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

const fn = new lambda.Function(this, 'DeleteEcrRepoFn', {
  runtime: lambda.Runtime.PYTHON_3_9,
  handler: 'index.lambda_handler',
  code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/delete-ecr')),
  timeout: Duration.seconds(30),
});

fn.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    "ecr:DescribeRepositories",
    "ecr:DeleteRepository",
    "ecr:ListImages",
    "ecr:BatchDeleteImage",
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:PutLogEvents"
  ],
  resources: ["*"], // Or specify the exact repo ARN
}));
