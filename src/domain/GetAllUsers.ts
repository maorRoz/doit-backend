import { User } from '../types/User';

const getUsersAverageAge = (users: User[]): number =>
  users.reduce((out, user) => (out += user.age), 0) / users.length;

const ExtractUserAndFetchTime = (
  getUser: (userId: string) => Promise<User>
) => async (
  userId: User['userId']
): Promise<{ user: User; fetchTime: number }> => {
  const startTime = Date.now();

  const user = await getUser(userId);

  const endTime = Date.now();

  return { user, fetchTime: endTime - startTime };
};

export const GetAllUsers = (
  getUser: (userId: string) => Promise<User>
) => async (
  userIds: User['userId'][]
): Promise<{
  users: User[];
  fetchTimes: number[];
  average: number;
}> => {
  const extractUserAndFetchTime = ExtractUserAndFetchTime(getUser);
  const fetchResponses = await Promise.all(
    userIds.map((userId) => extractUserAndFetchTime(userId))
  );
  const users = fetchResponses.map(({ user }) => user);
  const fetchTimes = fetchResponses.map(({ fetchTime }) => fetchTime);

  const invalidUserAge = (user) => user.age !== 0 && !Number(user.age);
  const isAnyUserInvalid = users.some((user) => !user || invalidUserAge(user));

  return {
    users,
    fetchTimes,
    average: isAnyUserInvalid ? NaN : getUsersAverageAge(users)
  };
};
