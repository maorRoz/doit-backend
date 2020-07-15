import { db } from './client';

export const createUser = () =>
  db
    .put({
      TableName: 'users',
      Item: {
        userId: '126',
        name: 'noa',
        age: 17
      }
    })
    .promise();
