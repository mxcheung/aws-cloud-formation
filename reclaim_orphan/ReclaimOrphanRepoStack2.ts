import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class ReclaimOrphanRepoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ecr.CfnRepository(this, 'OrphanedRepo', {
      repositoryName: 'my-ecr-repo',
    }).applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
  }
}
