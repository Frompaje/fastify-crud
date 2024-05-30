import { Prisma, User } from "@prisma/client";
import { compare, hash } from "bcryptjs";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(string: string): Promise<User | null>;
}

export interface Hasher {
  hash(payload: string): Promise<string>;
  compare(data: string, payload: string): Promise<boolean>;
}

export class BcryptAdapter implements Hasher {
  private SALT = 6;
  hash(payload: string): Promise<string> {
    return hash(payload, this.SALT);
  }
  compare(data: string, payload: string): Promise<boolean> {
    return compare(data, payload);
  }
}
