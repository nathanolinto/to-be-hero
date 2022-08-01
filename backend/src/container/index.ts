import { container } from "tsyringe";

import { NgosRepository } from "../infra/mongoose/repositories/NgosRepository";
import { INgosRepository } from "../repositories/INgosRepository";
import { IncidentsRepository } from "../infra/mongoose/repositories/IncidentsRepository";
import { IIncidentsRepository } from "../repositories/IIncidentsRepository";

container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);
container.registerSingleton<IIncidentsRepository>(
  "IncidentsRepository",
  IncidentsRepository
);
