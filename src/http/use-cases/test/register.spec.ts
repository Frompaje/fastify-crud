import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { InMemoryUserRepository } from "@/repositories/in-memory/In-memory-users-repository";

describe("Register Use Case", () => {
  beforeEach(() => {});
  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "yanedwards987@hotmail.com",
      password: "123123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});

describe("Register user with same email", () => {
  it("should not be albe to register with same email twice", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const email = "yan@exempl1.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123123",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
