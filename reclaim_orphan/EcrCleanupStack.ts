import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as iam from 'aws-cdk-lib/aws-iam';

export class EcrCleanupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 🔐 Explicit custom resource role
    const customResourceRole = new iam.Role(this, 'EcrCleanupRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // 🔧 Add only the permissions needed
    customResourceRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        'ecr:DeleteRepository',
        'ecr:ListImages',
        'ecr:BatchDeleteImage',
      ],
      resources: ['*'], // or scope to the specific repo ARN
    }));

    // 🔁 Custom resource to delete ECR repo
    const deleteRepo = new cr.AwsCustomResource(this, 'DeleteEcrRepo', {
      onCreate: {
        service: 'ECR',
        action: 'deleteRepository',
        parameters: {
          repositoryName: 'my-ecr-repo',
          force: true,
        },
        physicalResourceId: cr.PhysicalResourceId.of('DeleteMyEcrRepoOnce'),
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements([]), // We override the role below
      role: customResourceRole,
    });
  }
}
