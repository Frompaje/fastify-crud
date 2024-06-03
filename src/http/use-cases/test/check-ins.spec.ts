import { CheckInsRepository } from "@/repositories/prisma-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "../check-in";
import { makeMockCheckIn } from "./factories/make-check-ins";

describe("Check-in Use Case", () => {
  let checkInsRepository: CheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = {
      create: vi.fn(),
    };

    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const checkInCreated = makeMockCheckIn();

    vi.spyOn(checkInsRepository, "create").mockResolvedValue(checkInCreated);

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 6, 30, 0, 0));

    const checkInCreated = makeMockCheckIn();

    vi.spyOn(checkInsRepository, "create").mockResolvedValue(checkInCreated);

    await expect(() => {
      return sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
