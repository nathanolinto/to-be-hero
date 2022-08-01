import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListIncidentsByNgoIdUseCase } from "./ListIncidentsByNgoIdUseCase";

export class ListIncidentsByNgoIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listIncidentsByNgoIdUseCase = container.resolve(
      ListIncidentsByNgoIdUseCase
    );
    const incidents = await listIncidentsByNgoIdUseCase.execute(
      request.params.ongId
    );
    return response.status(200).json(incidents);
  }
}
