import { CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";

export function makeMockCheckIn(override?: Partial<CheckIn>): CheckIn {
  return {
    id: randomUUID(),
    user_id: "user-01",
    gymId: "gym-01",
    validated_at: new Date(),
    created_at: new Date(),
    ...override,
  };
}
