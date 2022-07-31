import { inject, injectable } from "tsyringe";

import { INgo } from "../../infra/mongoose/entities/Ngo";
import { NgosRepository } from "../../infra/mongoose/repositories/NgosRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class FindNgoByIdUseCase {
  constructor(
    @inject("NgosRepository")
    private ngosRepository: NgosRepository
  ) {}
  async execute(id: string): Promise<INgo> {
    if (!id) {
      throw new AppError("Id is required!");
    }
    const ngo = await this.ngosRepository.findById(id);
    return ngo;
  }
}
