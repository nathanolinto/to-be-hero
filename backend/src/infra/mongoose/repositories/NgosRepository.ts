import { ICreateNgoDTO } from "dtos/ICreateNgoDTO";
import { Model, Types } from "mongoose";

import { INgosRepository } from "../../../repositories/INgosRepository";
import { INgo, Ngo } from "../entities/Ngo";

export class NgosRepository implements INgosRepository {
  private repository: Model<INgo>;
  constructor() {
    this.repository = Ngo;
  }
  async create(data: ICreateNgoDTO): Promise<INgo> {
    const { name, email, whatsapp, city, uf } = data;
    const ngo = new Ngo({
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    await ngo.save();
    return ngo;
  }
}
