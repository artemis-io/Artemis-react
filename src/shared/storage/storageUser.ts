import { User } from "../entities/user.entities";
import { USER_STORAGE } from "./config";


export async function storageUserSave(user: User) {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = localStorage.getItem(USER_STORAGE);

  const user: User = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageUserRemove() {
  localStorage.removeItem(USER_STORAGE);
}
