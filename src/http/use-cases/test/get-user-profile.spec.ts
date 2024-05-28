import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "../get-user-profile";
import { InMemoryUserRepository } from "@/repositories/in-memory/In-memory-users-repository";

describe("Get User Profile Use Case", () => {
  it("should be able to authenticate", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new GetUserProfileUseCase(userRepository);

    const userCreated = await userRepository.create({
      name: "Jhon Doe",
      email: "yan@exemple.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: userCreated.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Jhon Doe");
  });

  it("should be able to get user profile with wrong id", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new GetUserProfileUseCase(userRepository);

    await expect(() =>
      sut.execute({ userId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
