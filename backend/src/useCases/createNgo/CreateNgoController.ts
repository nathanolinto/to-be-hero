import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateNgoUseCase } from "./CreateNgoUseCase";

export class CreateNgoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createNgoUseCase = container.resolve(CreateNgoUseCase);
    const ngo = await createNgoUseCase.execute(request.body);
    return response.status(200).json(ngo);
  }
}
