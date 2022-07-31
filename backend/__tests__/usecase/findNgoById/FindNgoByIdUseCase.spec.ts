import { container } from "tsyringe";

import { INgosRepository } from "../../../src/repositories/INgosRepository";
import { NgosRepository } from "../../../src/infra/mongoose/repositories/NgosRepository";
import { FindNgoByIdUseCase } from "../../../src/useCases/findNgoById/FindNgoByIdUseCase";
import { AppError } from "../../../src/erros/AppErros";

container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);

describe("FindNgoByIdUseCase Tests", () => {
  let findNgoByIdUseCase: FindNgoByIdUseCase;

  const ngoMock = {
    _id: "id",
    name: "name",
    email: "email",
    whatsapp: "whatsapp",
    city: "city",
    uf: "uf",
  };

  beforeEach(() => {
    findNgoByIdUseCase = container.resolve(FindNgoByIdUseCase);
  });

  describe("findNgoByIdUseCase Tests", () => {
    it("shoud be find Ngo by id", async () => {
      NgosRepository.prototype.findById = jest
        .fn()
        .mockResolvedValueOnce(ngoMock);

      const findNgo = await findNgoByIdUseCase.execute(ngoMock._id);

      expect(findNgo._id).toEqual(ngoMock._id);
      expect(findNgo.name).toEqual(ngoMock.name);
    });

    describe("Shoud be return error", () => {
      it("Id not Null", async () => {
        await expect(findNgoByIdUseCase.execute(null)).rejects.toEqual(
          new AppError("Id is required!")
        );
      });
    });
  });
});
