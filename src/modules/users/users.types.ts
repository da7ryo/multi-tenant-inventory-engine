import { UserDb } from "../../core/db";

export type UserWithoudPassword = Omit<UserDb, "password">;
