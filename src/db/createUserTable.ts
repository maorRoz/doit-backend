/* eslint-disable no-console */
import AWS from 'aws-sdk';
AWS.config.update({
  region: 'us-east-1',
  // @ts-expect-error
  endpoint: 'http://localhost:8000'
});
const dynamodb = new AWS.DynamoDB();
const tableParams = {
  TableName: 'users',
  KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
  AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

export const createUserTable = () => dynamodb
.createTable(tableParams)
.promise()
.then((data) => console.log('Created table.', JSON.stringify(data, null, 2)))
.catch((err) => console.error('Error JSON.', JSON.stringify(err, null, 2)))