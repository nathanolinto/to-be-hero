import { IIncident } from "../infra/mongoose/entities/Incident";

export interface IListIncidentsParamsDTO {
  page: number;
  limit: number;
}

export interface IListIncidentsDTO {
  records: IIncident[];
  total: number;
  totalPages: number;
  page: number;
}
