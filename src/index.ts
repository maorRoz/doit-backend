import { getAllUsers } from './domain/getAllUsers';
import { createUser } from './db/createUser';

(async () => {
  const response = await getAllUsers(['123','124','126','133']);
  // eslint-disable-next-line no-console
  console.log(response);
})();
