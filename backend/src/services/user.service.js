import bcrypt from "bcryptjs";
import {
  findAllUsers,
  findUserById,
  insertUser,
  modifyUser,
  removeUser
} from "../models/user.model.js";

export const getUsers = async () => {
  return await findAllUsers();
};

export const getUserById = async (id) => {
  return await findUserById(id);
};

export const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);

  return await insertUser({
    ...user,
    password: hashedPassword
  });
};

export const updateUser = async (id, user) => {
  const existingUser = await findUserById(id);

  if (!existingUser) {
    return null;
  }

  const updatedUser = { ...user };

  if (updatedUser.password !== undefined) {
    updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
  }

  return await modifyUser(id, updatedUser);
};

export const deleteUser = async (id) => {
  return await removeUser(id);
};