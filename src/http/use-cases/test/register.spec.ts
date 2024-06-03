import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { Hasher, UserRepository } from "@/interface/users-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterUseCase } from "../register";

describe("Register Use Case", () => {
  let userRepository: UserRepository;
  let hasher: Hasher;
  let registerUseCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };
    hasher = {
      compare: vi.fn(),
      hash: vi.fn(),
    };
    registerUseCase = new RegisterUseCase(userRepository, hasher);
  });

  describe("Register user with same email", () => {
    it("should not be albe to register with same email twice", async () => {
      const email = "yan@exempl1.com";

      vi.spyOn(userRepository, "findByEmail").mockResolvedValue({
        id: "user-id",
        name: "Robestinho",
        created_at: new Date(),
        email,
        password_hash: "123213",
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
});
