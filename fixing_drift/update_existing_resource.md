```
aws cloudformation create-change-set --stack-name existing-stack-name --change-set-name import-change-set --change-set-type IMPORT --resources-to-import '[{"ResourceType":"AWS::DynamoDB::Table","LogicalResourceId":"ExistingDynamoDBTable","ResourceIdentifier":{"TableName":"existing-dynamodb-table-name"}}]' --template-body file://template.yaml
```

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import.html
