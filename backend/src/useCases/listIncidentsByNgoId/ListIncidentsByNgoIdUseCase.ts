import { inject, injectable } from "tsyringe";

import { IIncident } from "../../infra/mongoose/entities/Incident";
import { IncidentsRepository } from "../../infra/mongoose/repositories/IncidentsRepository";
import { NgosRepository } from "../../infra/mongoose/repositories/NgosRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class ListIncidentsByNgoIdUseCase {
  constructor(
    @inject("IncidentsRepository")
    private incidentsRepository: IncidentsRepository,
    @inject("NgosRepository")
    private ngosRepository: NgosRepository
  ) {}
  async execute(ngo: string): Promise<IIncident[]> {
    if (!ngo) {
      throw new AppError("Ngo is required!");
    }
    const ngoAreadyExists = await this.ngosRepository.findById(ngo);
    if (!ngoAreadyExists) {
      throw new AppError("Ngo not exists!");
    }
    const incidents = await this.incidentsRepository.listByNgoId(ngo);
    return incidents;
  }
}
