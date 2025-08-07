import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cr from 'aws-cdk-lib/custom-resources';

export class ForceDeleteEcrRepoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const provider = new cr.AwsCustomResource(this, 'DeleteEcrRepo', {
      onCreate: {
        service: 'ECR',
        action: 'deleteRepository',
        parameters: {
          repositoryName: 'my-ecr-repo',
          force: true,
        },
        physicalResourceId: cr.PhysicalResourceId.of('delete-my-ecr-repo'),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}
