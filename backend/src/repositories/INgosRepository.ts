import { INgo } from "../infra/mongoose/entities/Ngo";
import { ICreateNgoDTO } from "../dtos/ICreateNgoDTO";

export interface INgosRepository {
  create(data: ICreateNgoDTO): Promise<INgo>;
}
