import { inject, injectable } from "tsyringe";

import {
  IListIncidentsDTO,
  IListIncidentsParamsDTO,
} from "../../dtos/IListIncidentsDTO";
import { IncidentsRepository } from "../../infra/mongoose/repositories/IncidentsRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class ListIncidentsUseCase {
  constructor(
    @inject("IncidentsRepository")
    private incidentsRepository: IncidentsRepository
  ) {}
  async execute(data: IListIncidentsParamsDTO): Promise<IListIncidentsDTO> {
    const { page, limit } = data;
    if (typeof limit !== "number") {
      throw new AppError("Limit not a number!");
    }
    if (typeof page !== "number") {
      throw new AppError("Page not a number!");
    }
    const incidents = await this.incidentsRepository.list(data);
    return incidents;
  }
}
