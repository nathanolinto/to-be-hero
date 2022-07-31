import { INgo } from "../infra/mongoose/entities/Ngo";
import { ICreateNgoDTO } from "../dtos/ICreateNgoDTO";

export interface INgosRepository {
  create(data: ICreateNgoDTO): Promise<INgo>;
  findByName(name: string): Promise<INgo>;
  findByEmail(email: string): Promise<INgo>;
  findById(id: string): Promise<INgo>;
}
