import { container } from "tsyringe";

import { IIncidentsRepository } from "../../../src/repositories/IIncidentsRepository";
import { IncidentsRepository } from "../../../src/infra/mongoose/repositories/IncidentsRepository";
import { INgosRepository } from "../../../src/repositories/INgosRepository";
import { NgosRepository } from "../../../src/infra/mongoose/repositories/NgosRepository";
import { CreateIncidentUseCase } from "../../../src/useCases/createIncident/CreateIncidentUseCase";
import { AppError } from "../../../src/erros/AppErros";

container.registerSingleton<IIncidentsRepository>(
  "IncidentsRepository",
  IncidentsRepository
);
container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);

describe("CreateIncidentUseCase Tests", () => {
  let createIncidentUseCase: CreateIncidentUseCase;

  const incidentMock = {
    _id: "id",
    title: "title",
    description: "description",
    value: 1,
    ngo: "ong",
  };

  beforeEach(() => {
    createIncidentUseCase = container.resolve(CreateIncidentUseCase);
  });

  describe("createIncidentUseCase Tests", () => {
    it("shoud be create Incident", async () => {
      IncidentsRepository.prototype.create = jest
        .fn()
        .mockResolvedValueOnce(incidentMock);
      NgosRepository.prototype.findById = jest
        .fn()
        .mockResolvedValueOnce(incidentMock);

      const createdIncident = await createIncidentUseCase.execute(incidentMock);

      expect(createdIncident).toHaveProperty("_id");
      expect(createdIncident.title).toEqual(incidentMock.title);
    });

    describe("Shoud be return error", () => {
      it("Ngo not exists", async () => {
        NgosRepository.prototype.findById = jest.fn().mockReturnValueOnce(null);

        await expect(
          createIncidentUseCase.execute(incidentMock)
        ).rejects.toEqual(new AppError("Ngo not exists!"));
      });
      it("Title not Null", async () => {
        await expect(
          createIncidentUseCase.execute({ ...incidentMock, title: "" })
        ).rejects.toEqual(new AppError("Title is required!"));
      });
      it("Description not Null", async () => {
        await expect(
          createIncidentUseCase.execute({ ...incidentMock, description: "" })
        ).rejects.toEqual(new AppError("Description is required!"));
      });
      it("Value not Null", async () => {
        await expect(
          createIncidentUseCase.execute({ ...incidentMock, value: null })
        ).rejects.toEqual(new AppError("Value is required!"));
      });
      it("Ngo not Null", async () => {
        await expect(
          createIncidentUseCase.execute({ ...incidentMock, ngo: "" })
        ).rejects.toEqual(new AppError("Ngo is required!"));
      });
    });
  });
});
