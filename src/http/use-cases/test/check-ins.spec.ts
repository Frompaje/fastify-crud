import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { CheckInUseCase } from "../check-in";

describe("Check-in Use Case", () => {
  it("should be able to check in", async () => {
    const userRepository = new InMemoryCheckInsRepository();
    const sut = new CheckInUseCase(userRepository);

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
