import { IIncident } from "../infra/mongoose/entities/Incident";
import { ICreateIncidentDTO } from "../dtos/ICreateIncidentDTO";

export interface IIncidentsRepository {
  create(data: ICreateIncidentDTO): Promise<IIncident>;
}
