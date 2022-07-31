import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindNgoByIdUseCase } from "./FindNgoByIdUseCase";

export class FindNgoByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findNgoByIdUseCase = container.resolve(FindNgoByIdUseCase);
    const ngo = await findNgoByIdUseCase.execute(request.params.id);
    return response.status(200).json(ngo);
  }
}
