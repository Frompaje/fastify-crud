import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/interface/users-repository";
import { User } from "@prisma/client";

interface GetUseProfileUseCaseRequest {
  userId: string;
}

interface GetUseProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(public readonly userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUseProfileUseCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
