import { inject, injectable } from "tsyringe";

import { ICreateIncidentDTO } from "../../dtos/ICreateIncidentDTO";
import { IIncident } from "../../infra/mongoose/entities/Incident";
import { IncidentsRepository } from "../../infra/mongoose/repositories/IncidentsRepository";
import { NgosRepository } from "../../infra/mongoose/repositories/NgosRepository";
import { AppError } from "../../erros/AppErros";

@injectable()
export class CreateIncidentUseCase {
  constructor(
    @inject("IncidentsRepository")
    private incidentsRepository: IncidentsRepository,
    @inject("NgosRepository")
    private ngosRepository: NgosRepository
  ) {}
  async execute(data: ICreateIncidentDTO): Promise<IIncident> {
    const { title, description, value, ngo } = data;

    if (!title) {
      throw new AppError("Title is required!");
    }
    if (!description) {
      throw new AppError("Description is required!");
    }
    if (!value) {
      throw new AppError("Value is required!");
    }
    if (!ngo) {
      throw new AppError("Ngo is required!");
    }
    const ngoAreadyExists = await this.ngosRepository.findById(ngo);
    if (!ngoAreadyExists) {
      throw new AppError("Ngo not exists!");
    }

    const incident = await this.incidentsRepository.create(data);
    return incident;
  }
}
