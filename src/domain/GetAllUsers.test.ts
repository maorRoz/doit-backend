import { Fakes } from '../test-utils/Fakes';
import { FakeUser } from '../test-utils/FakeUser';
import { GetAllUsers } from './GetAllUsers';

describe('GetAllUsers', () => {
  test('successful fetch', async () => {
    const [user1, user2, user3] = [
      FakeUser({ age: 15 }),
      FakeUser({ age: 17 }),
      FakeUser({ age: 19 })
    ];
    const getUserMock = jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2)
      .mockReturnValueOnce(user3);

    const getAllUsers = GetAllUsers(getUserMock);
    const response = await getAllUsers([
      user1.userId,
      user2.userId,
      user3.userId
    ]);

    expect(response.users).toEqual([user1, user2, user3]);
    expect(response.average).toBe(17);
  });

  test('One of the users not found', async () => {
    const [user1, user2, user3] = [
      FakeUser({ age: 15 }),
      null,
      FakeUser({ age: 19 })
    ];

    const getUserMock = jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2)
      .mockReturnValueOnce(user3);

    const getAllUsers = GetAllUsers(getUserMock);
    const response = await getAllUsers([
      user1.userId,
      Fakes.string(),
      user3.userId
    ]);

    expect(response.users).toEqual([user1, user2, user3]);
    expect(response.average).toBeNaN();
  });

  test('One of the users has no age field', async () => {
    const [user1, user2, user3] = [
      FakeUser({ age: 15 }),
      FakeUser({ age: undefined }),
      FakeUser({ age: 19 })
    ];
    const getUserMock = jest
      .fn()
      .mockReturnValueOnce(user1)
      .mockReturnValueOnce(user2)
      .mockReturnValueOnce(user3);

    const getAllUsers = GetAllUsers(getUserMock);
    const response = await getAllUsers([
      user1.userId,
      user2.userId,
      user3.userId
    ]);

    expect(response.users).toEqual([user1, user2, user3]);
    expect(response.average).toBeNaN();
  });
});
