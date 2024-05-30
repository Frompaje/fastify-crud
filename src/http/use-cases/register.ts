import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { Hasher, UserRepository } from "@/interface/users-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await this.hasher.hash(password);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
