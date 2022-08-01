import { ICreateIncidentDTO } from "dtos/ICreateIncidentDTO";
import { Model, Types } from "mongoose";

import { IIncidentsRepository } from "../../../repositories/IIncidentsRepository";
import { IIncident, Incident } from "../entities/Incident";

export class IncidentsRepository implements IIncidentsRepository {
  private repository: Model<IIncident>;
  constructor() {
    this.repository = Incident;
  }
  async create(data: ICreateIncidentDTO): Promise<IIncident> {
    const { title, description, value, ngo } = data;
    const ngoObjectId = new Types.ObjectId(ngo);
    const tags = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .split(" ");
    const incident = await this.repository.create({
      title,
      description,
      value,
      ngo: ngoObjectId,
      tags,
    });
    return incident;
  }
}
