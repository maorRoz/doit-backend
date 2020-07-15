import { Fakes } from '../test-utils/Fakes';
import { db } from './client';

export const createUser = () =>
  db
    .put({
      TableName: 'users',
      Item: {
        userId: Fakes.string(),
        name: Fakes.string(),
        age: Fakes.number()
      }
    })
    .promise();
