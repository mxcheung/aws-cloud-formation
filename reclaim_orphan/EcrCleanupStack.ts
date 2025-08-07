import * as cdk from 'aws-cdk-lib';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EcrCleanupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecrRepoName = 'my-ecr-repo'; // Replace with your repo name

    // 🔐 Create a separate role for the custom resource
    const customResourceRole = new iam.Role(this, 'EcrCleanupCustomResourceRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // 🪪 Grant permission to delete the ECR repository and list images
    customResourceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'ecr:DeleteRepository',
          'ecr:DescribeRepositories',
          'ecr:ListImages',
          'ecr:BatchDeleteImage',
        ],
        resources: [
          `arn:aws:ecr:${this.region}:${this.account}:repository/${ecrRepoName}`,
        ],
      })
    );

    // 📛 Also allow tagging-related permissions (for CDK’s tag manager)
    customResourceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['ecr:TagResource', 'ecr:UntagResource'],
        resources: [`arn:aws:ecr:${this.region}:${this.account}:repository/${ecrRepoName}`],
      })
    );

    // ⚙️ Use AwsCustomResource to delete the repo
    const deleteEcrRepo = new cr.AwsCustomResource(this, 'DeleteEcrRepo', {
      onCreate: {
        service: 'ECR',
        action: 'deleteRepository',
        parameters: {
          repositoryName: ecrR
