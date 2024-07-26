# Get existing temple
```
aws cloudformation get-template --stack-name MyStack --query "TemplateBody" --output text > template.yaml
```

# create change set
```
aws cloudformation create-change-set \
  --stack-name your-stack-name \
  --change-set-name import-change-set \
  --change-set-type IMPORT \
  --template-body file://template.yaml \
  --resources-to-import '[{"ResourceType":"AWS::DynamoDB::Table","LogicalResourceId":"ImportedTable","ResourceIdentifier":{"TableName":"existing-table-name"}}]'

# execute change set
```
aws cloudformation execute-change-set \
  --change-set-name import-change-set \
  --stack-name your-stack-name
```