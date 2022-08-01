import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIncidentUseCase } from "./CreateIncidentUseCase";

export class CreateIncidentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createIncidentUseCase = container.resolve(CreateIncidentUseCase);
    const incident = await createIncidentUseCase.execute(request.body);
    return response.status(200).json(incident);
  }
}
