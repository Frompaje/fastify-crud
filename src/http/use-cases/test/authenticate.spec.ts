import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UserRepository } from "@/interface/users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticateUseCase } from "../authenticate";
import { makeMockUser } from "./factories/make-user";

describe("Authentica Use Case", () => {
  let userRepository: UserRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };
    sut = new AuthenticateUseCase(userRepository);
  });

  it("should be able to authenticate", async () => {
    const userCreated = makeMockUser({
      email: "okdas@gmail.com",
      password_hash: "481523321",
    });

    vi.spyOn(userRepository, "findByEmail").mockResolvedValue(userCreated);
    const { user } = await sut.execute({
      email: "okdas@gmail.com",
      password: "481523321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    const userCreated = makeMockUser();
    vi.spyOn(userRepository, "create").mockResolvedValue(userCreated);

    await expect(() =>
      sut.execute({
        email: "yan@eexemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    const userCreated = makeMockUser();
    vi.spyOn(userRepository, "create").mockResolvedValue(userCreated);

    await expect(() =>
      sut.execute({
        email: "yan@exemple.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
