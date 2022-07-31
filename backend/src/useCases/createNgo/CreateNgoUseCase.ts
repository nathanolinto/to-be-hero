import { inject, injectable } from "tsyringe";

import { ICreateNgoDTO } from "../../dtos/ICreateNgoDTO";
import { INgo } from "../../infra/mongoose/entities/Ngo";
import { NgosRepository } from "../../infra/mongoose/repositories/NgosRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class CreateNgoUseCase {
  constructor(
    @inject("NgosRepository")
    private ngosRepository: NgosRepository
  ) {}
  async execute(data: ICreateNgoDTO): Promise<INgo> {
    const { name, email, whatsapp, city, uf } = data;
    let ngoAlreadyExists = null;

    if (!name) {
      throw new AppError("Name is required!");
    }
    ngoAlreadyExists = await this.ngosRepository.findByName(name);
    if (ngoAlreadyExists) {
      throw new AppError("Name already exist!");
    }
    if (!email) {
      throw new AppError("E-mail is required!");
    }
    ngoAlreadyExists = await this.ngosRepository.findByEmail(email);
    if (ngoAlreadyExists) {
      throw new AppError("E-mail already exist!");
    }
    if (!whatsapp) {
      throw new AppError("Whatsapp is required!");
    }
    if (!city) {
      throw new AppError("City is required!");
    }
    if (!uf) {
      throw new AppError("UF is required!");
    }

    const ngo = await this.ngosRepository.create(data);
    return ngo;
  }
}
