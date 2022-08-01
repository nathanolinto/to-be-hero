import { container } from "tsyringe";

import { IIncidentsRepository } from "../../../src/repositories/IIncidentsRepository";
import { IncidentsRepository } from "../../../src/infra/mongoose/repositories/IncidentsRepository";
import { INgosRepository } from "../../../src/repositories/INgosRepository";
import { NgosRepository } from "../../../src/infra/mongoose/repositories/NgosRepository";
import { ListIncidentsByNgoIdUseCase } from "../../../src/useCases/listIncidentsByNgoId/ListIncidentsByNgoIdUseCase";
import { AppError } from "../../../src/erros/AppErros";

container.registerSingleton<IIncidentsRepository>(
  "IncidentsRepository",
  IncidentsRepository
);
container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);

describe("CreateIncidentUseCase Tests", () => {
  let listIncidentsByNgoIdUseCase: ListIncidentsByNgoIdUseCase;

  const ngoMock = {
    _id: "id",
    name: "name",
    email: "email",
    whatsapp: "whatsapp",
    city: "city",
    uf: "uf",
  };
  const incidentMock = {
    _id: "id",
    title: "title",
    description: "description",
    value: 1,
    ngo: "ong",
  };

  beforeEach(() => {
    listIncidentsByNgoIdUseCase = container.resolve(
      ListIncidentsByNgoIdUseCase
    );
  });

  describe("listIncidentsByNgoIdUseCase Tests", () => {
    it("shoud be list Incident by Ngo Id", async () => {
      IncidentsRepository.prototype.listByNgoId = jest
        .fn()
        .mockResolvedValueOnce([incidentMock]);
      NgosRepository.prototype.findById = jest
        .fn()
        .mockResolvedValueOnce(ngoMock);

      const incidents = await listIncidentsByNgoIdUseCase.execute(ngoMock._id);

      expect(incidents[0]).toHaveProperty("_id");
      expect(incidents[0].title).toEqual(incidentMock.title);
    });

    describe("Shoud be return error", () => {
      it("Ngo not exists", async () => {
        NgosRepository.prototype.findById = jest.fn().mockReturnValueOnce(null);

        await expect(
          listIncidentsByNgoIdUseCase.execute(incidentMock.ngo)
        ).rejects.toEqual(new AppError("Ngo not exists!"));
      });
      it("Ngo not Null", async () => {
        await expect(listIncidentsByNgoIdUseCase.execute(null)).rejects.toEqual(
          new AppError("Ngo is required!")
        );
      });
    });
  });
});
