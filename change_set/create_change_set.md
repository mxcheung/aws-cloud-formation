```
aws cloudformation create-change-set \
  --stack-name your-stack-name \
  --change-set-name import-change-set \
  --change-set-type IMPORT \
  --template-body file://template.yaml \
  --resources-to-import '[{"ResourceType":"AWS::DynamoDB::Table","LogicalResourceId":"ImportedTable","ResourceIdentifier":{"TableName":"existing-table-name"}}]'
```
