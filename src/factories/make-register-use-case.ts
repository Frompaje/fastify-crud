import { RegisterUseCase } from "@/http/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export function makeRegisterUseCacase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);
  return registerUseCase;
}
