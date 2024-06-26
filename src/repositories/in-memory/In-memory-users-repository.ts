import { UserRepository } from "@/interface/users-repository";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  public dataBase: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.dataBase.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.dataBase.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: string) {
    const user = this.dataBase.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
