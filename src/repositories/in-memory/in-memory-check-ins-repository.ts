import { CheckIn, Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../prisma-check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public dataBase: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.dataBase.push(checkIn);

    return checkIn;
  }
}
