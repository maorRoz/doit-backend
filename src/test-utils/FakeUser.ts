import { User } from '../types/User';
import { Fakes } from './Fakes';

export const FakeUser = (props?: Partial<User>): User => ({
  userId: Fakes.string(),
  name: Fakes.string(),
  age: Fakes.number(),
  ...props
});
