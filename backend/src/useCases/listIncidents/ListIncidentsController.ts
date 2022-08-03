import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListIncidentsUseCase } from "./ListIncidentsUseCase";

export class ListIncidentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const limit = Number(request.query.limit) || 3;
    const page = Number(request.query.page) || 1;
    const listIncidentsUseCase = container.resolve(ListIncidentsUseCase);
    const incidents = await listIncidentsUseCase.execute({ limit, page });
    return response.status(200).json(incidents);
  }
}
