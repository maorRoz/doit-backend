import AWS from 'aws-sdk';
AWS.config.update({
  region: 'us-east-1',
  // @ts-expect-error
  endpoint: 'http://localhost:8000'
});

export const db = new AWS.DynamoDB.DocumentClient();
