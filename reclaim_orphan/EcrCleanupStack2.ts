import * as cr from 'aws-cdk-lib/custom-resources';
import * as iam from 'aws-cdk-lib/aws-iam';

// The resource to delete
const repoName = 'your-repo-name';

const provider = new cr.AwsCustomResource(this, 'DeleteEcrRepo', {
  onCreate: {
    service: 'ECR',
    action: 'deleteRepository',
    parameters: {
      repositoryName: repoName,
      force: true
    },
    physicalResourceId: cr.PhysicalResourceId.of(repoName),
  },
  policy: cr.AwsCustomResourcePolicy.fromStatements([
    new iam.PolicyStatement({
      actions: ['ecr:DeleteRepository', 'ecr:DescribeRepositories'],
      resources: [`arn:aws:ecr:${this.region}:${this.account}:repository/${repoName}`],
    }),
  ]),
});
