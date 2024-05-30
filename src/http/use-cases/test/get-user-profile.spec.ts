import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/interface/users-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetUserProfileUseCase } from "../get-user-profile";
import { makeMockUser } from "./factories/make-user";

describe("Get User Profile Use Case", () => {
  let userRepository: UserRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    userRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should be able to authenticate", async () => {
    const userCreated = makeMockUser();

    vi.spyOn(userRepository, "findById").mockResolvedValue(userCreated);

    const { user } = await sut.execute({
      userId: userCreated.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual(expect.any(String));
  });

  it("should be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({ userId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
