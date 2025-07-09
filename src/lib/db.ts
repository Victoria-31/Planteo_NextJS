import User, { IUser } from './models/User';

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email }).lean().exec() as IUser | null; 
}
