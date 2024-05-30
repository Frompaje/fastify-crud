import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { randomUUID } from "node:crypto";

export function makeMockUser(override?: Partial<User>): User {
  return {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created_at: new Date(),
    ...override,
    password_hash: hashSync(override?.password_hash ?? faker.string.alpha(), 6),
  };
}
