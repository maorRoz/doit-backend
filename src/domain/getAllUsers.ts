import { User } from '../types/User';
import { getUser } from '../db/getUser';

const getUsersAverageAge = (users: User[]): number =>
  users.reduce((out, user) => (out += user.age), 0) / users.length;

const extractUserAndProcessTime = async (
  userId: User['userId']
): Promise<{ user: User; responseTime: number }> => {
  const startTime = Date.now();

  let user: User;
  try {
    user = await getUser(userId);
  } catch (e) {
    user = null;
  }

  const endTime = Date.now();
  const responseTime = endTime - startTime;

  return { user, responseTime };
};

export const getAllUsers = async (
  userIds: User['userId'][]
): Promise<{
  users: User[];
  fetchTimes: number[];
  average: number;
}> => {
  const fetchResponses = await Promise.all(
    userIds.map((userId) => extractUserAndProcessTime(userId))
  );
  const users = fetchResponses.map(({ user }) => user);
  const fetchTimes = fetchResponses.map(({ responseTime }) => responseTime);

  const invalidUserAge = (user) => user.age !== 0 && !Number(user.age);
  const isAnyUserInvalid = users.some((user) => !user || invalidUserAge(user));

  return {
    users,
    fetchTimes,
    average: isAnyUserInvalid ? NaN : getUsersAverageAge(users)
  };
};
