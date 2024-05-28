import { InMemoryUserRepository } from "@/repositories/in-memory/In-memory-users-Repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

describe("Authentica Use Case", () => {
  it("should be able to authenticate", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: "Jhon Doe",
      email: "yan@exemple.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "yan@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: "Jhon Doe",
      email: "yan@exemple.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "yan@eexemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: "Jhon Doe",
      email: "yan@exemple.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "yan@exemple.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
