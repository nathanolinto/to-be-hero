import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteIncidentUseCase } from "./DeleteIncidentUseCase";

export class DeleteIncidentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteIncidentUseCase = container.resolve(DeleteIncidentUseCase);
    const deletedIncident = await deleteIncidentUseCase.execute(
      request.body.id
    );
    return response.status(200).json(deletedIncident);
  }
}
