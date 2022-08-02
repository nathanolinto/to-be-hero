import { IIncident } from "../infra/mongoose/entities/Incident";
import { ICreateIncidentDTO } from "../dtos/ICreateIncidentDTO";

export interface IIncidentsRepository {
  create(data: ICreateIncidentDTO): Promise<IIncident>;
  listByNgoId(ngo: string): Promise<IIncident[]>;
  delete(id: string): Promise<Number>;
  findById(id: string): Promise<IIncident>;
}
