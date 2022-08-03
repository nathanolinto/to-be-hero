import { inject, injectable } from "tsyringe";

import {
  IListIncidentsDTO,
  IListIncidentsParamsDTO,
} from "../../dtos/IListIncidentsDTO";
import { IncidentsRepository } from "../../infra/mongoose/repositories/IncidentsRepository";

@injectable()
export class ListIncidentsUseCase {
  constructor(
    @inject("IncidentsRepository")
    private incidentsRepository: IncidentsRepository
  ) {}
  async execute(data: IListIncidentsParamsDTO): Promise<IListIncidentsDTO> {
    const { page = 1, limit = 5 } = data;
    const incidents = await this.incidentsRepository.list({ page, limit });
    return incidents;
  }
}
