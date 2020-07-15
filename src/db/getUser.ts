import { User } from '../types/User';
import { db } from './client';

export const getUser = async (userId: User['userId']): Promise<User> => {
  const userQueryResult = await db
    .get({
      TableName: 'users',
      Key: {
        userId
      }
    })
    .promise()
    .catch(() => null)

    return userQueryResult.Item as User;
  }
