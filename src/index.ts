import { GetAllUsers } from './domain/GetAllUsers';
import { getUser } from './db/getUser';

const getAllUsers = GetAllUsers(getUser);

(async () => {
  const response = await getAllUsers(['123', '124', '126', '133']);
  // eslint-disable-next-line no-console
  console.log(response);
})();
