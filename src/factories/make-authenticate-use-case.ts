import { AuthenticateUseCase } from "@/http/use-cases/authenticate";
import { BcryptAdapter } from "@/interface/users-repository";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
}
