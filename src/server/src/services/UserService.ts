import UserRepo from '@src/repos/UserRepo';
import User, { INewUser, IUser, IUpdateUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';
export const USER_EMAIL_EXISTS_ERR = 'Email already exists';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(user: INewUser): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Register new user.
 */
async function register(user: INewUser): Promise<void> {
  const persists = await UserRepo.persistsEmail(user.email);
  if (persists) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      USER_EMAIL_EXISTS_ERR,
    );
  }
  // Add user
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUpdateUser): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  if (user.email) {
    const emailPersists = await UserRepo.persistsEmail(user.email);
    if (emailPersists) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        USER_EMAIL_EXISTS_ERR,
      );
    }
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  register,
  updateOne,
  delete: _delete,
} as const;
