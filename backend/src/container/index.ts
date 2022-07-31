import { container } from "tsyringe";

import { NgosRepository } from "../infra/mongoose/repositories/NgosRepository";
import { INgosRepository } from "../repositories/INgosRepository";

container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);
