import { ICreateIncidentDTO } from "dtos/ICreateIncidentDTO";
import { Model, Types } from "mongoose";

import { IIncidentsRepository } from "../../../repositories/IIncidentsRepository";
import { IIncident, Incident } from "../entities/Incident";
import {
  IListIncidentsDTO,
  IListIncidentsParamsDTO,
} from "../../../dtos/IListIncidentsDTO";

export class IncidentsRepository implements IIncidentsRepository {
  private repository: Model<IIncident>;
  constructor() {
    this.repository = Incident;
  }
  async list(data: IListIncidentsParamsDTO): Promise<IListIncidentsDTO> {
    const { limit, page } = data;
    const incidents = await this.repository
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 });
    const count = await this.repository.countDocuments();
    return {
      records: incidents,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      page,
    };
  }
  async findById(id: string): Promise<IIncident> {
    const idObjectId = new Types.ObjectId(id);
    const incident = await this.repository.findOne({ _id: idObjectId });
    return incident;
  }
  async delete(id: string): Promise<Number> {
    const idObjectId = new Types.ObjectId(id);
    const deleteIncident = await this.repository.deleteOne({ _id: idObjectId });
    return deleteIncident.deletedCount;
  }
  async listByNgoId(ngo: string): Promise<IIncident[]> {
    const ngoObjectId = new Types.ObjectId(ngo);
    const incidents = await this.repository.find({ ngo: ngoObjectId });
    return incidents;
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
