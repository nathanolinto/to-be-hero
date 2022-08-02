import { inject, injectable } from "tsyringe";

import { IncidentsRepository } from "../../infra/mongoose/repositories/IncidentsRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class DeleteIncidentUseCase {
  constructor(
    @inject("IncidentsRepository")
    private incidentsRepository: IncidentsRepository
  ) {}
  async execute(id: string): Promise<Number> {
    if (!id) {
      throw new AppError("Id is required!");
    }
    const incidentAreadyExists = await this.incidentsRepository.findById(id);
    if (!incidentAreadyExists) {
      throw new AppError("Incident not exists!");
    }

    const incident = await this.incidentsRepository.delete(id);
    return incident;
  }
}
