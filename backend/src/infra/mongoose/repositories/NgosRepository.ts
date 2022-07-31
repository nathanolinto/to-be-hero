import { ICreateNgoDTO } from "dtos/ICreateNgoDTO";
import { Model, Types } from "mongoose";

import { INgosRepository } from "../../../repositories/INgosRepository";
import { INgo, Ngo } from "../entities/Ngo";

export class NgosRepository implements INgosRepository {
  private repository: Model<INgo>;
  constructor() {
    this.repository = Ngo;
  }
  async findByName(name: string): Promise<INgo> {
    const ngo = await this.repository.findOne({
      name,
    });
    return ngo;
  }
  async findByEmail(email: string): Promise<INgo> {
    const ngo = await this.repository.findOne({
      email,
    });
    return ngo;
  }
  async create(data: ICreateNgoDTO): Promise<INgo> {
    const { name, email, whatsapp, city, uf } = data;
    const ngo = await this.repository.create({
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    return ngo;
  }
}
