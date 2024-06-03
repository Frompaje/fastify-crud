import { RegisterUseCase } from "@/http/use-cases/register";
import { BcryptAdapter } from "@/interface/users-repository";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export function makeRegisterUseCacase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const hasher = new BcryptAdapter();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository, hasher);
  return registerUseCase;
}
