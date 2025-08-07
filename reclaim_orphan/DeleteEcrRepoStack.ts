import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as iam from 'aws-cdk-lib/aws-iam';

export class DeleteEcrRepoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repoName = 'your-ecr-repo-name';

    const deleteEcrRepo = new cr.AwsCustomResource(this, 'DeleteEcrRepo', {
      onCreate: {
        service: 'ECR',
        action: 'deleteRepository',
        parameters: {
          repositoryName: repoName,
          force: true,
        },
        physicalResourceId: cr.PhysicalResourceId.of(`delete-${repoName}`),
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: [
            'ecr:DeleteRepository',
            'ecr:ListRepositories',
            'ecr:DescribeRepositories',
            'ecr:TagResource', // if tags are used
            'ecr:UntagResource',
          ],
          resources: [
            `arn:aws:ecr:${this.region}:${this.account}:repository/${repoName}`,
          ],
        }),
      ]),
    });

    deleteEcrRepo.node.addDependency(this);
  }
}
