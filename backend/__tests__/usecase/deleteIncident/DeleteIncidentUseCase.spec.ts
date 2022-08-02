import { container } from "tsyringe";

import { IIncidentsRepository } from "../../../src/repositories/IIncidentsRepository";
import { IncidentsRepository } from "../../../src/infra/mongoose/repositories/IncidentsRepository";
import { NgosRepository } from "../../../src/infra/mongoose/repositories/NgosRepository";
import { DeleteIncidentUseCase } from "../../../src/useCases/deleteIncident/DeleteIncidentUseCase";
import { AppError } from "../../../src/erros/AppErros";

container.registerSingleton<IIncidentsRepository>(
  "IncidentsRepository",
  IncidentsRepository
);

describe("DeleteIncidentUseCase Tests", () => {
  let deleteIncidentUseCase: DeleteIncidentUseCase;

  const incidentMock = {
    _id: "id",
    title: "title",
    description: "description",
    value: 1,
    ngo: "ong",
  };

  beforeEach(() => {
    deleteIncidentUseCase = container.resolve(DeleteIncidentUseCase);
  });

  describe("DeleteIncidentUseCase Tests", () => {
    it("shoud be Delete Incident", async () => {
      IncidentsRepository.prototype.delete = jest.fn().mockResolvedValueOnce(1);
      IncidentsRepository.prototype.findById = jest
        .fn()
        .mockResolvedValueOnce(incidentMock);

      const deleteIncident = await deleteIncidentUseCase.execute(
        incidentMock._id
      );

      expect(deleteIncident).toEqual(1);
    });

    describe("Shoud be return error", () => {
      it("Incident not exists", async () => {
        IncidentsRepository.prototype.findById = jest
          .fn()
          .mockReturnValueOnce(null);

        await expect(
          deleteIncidentUseCase.execute(incidentMock._id)
        ).rejects.toEqual(new AppError("Incident not exists!"));
      });
      it("Id not Null", async () => {
        await expect(deleteIncidentUseCase.execute(null)).rejects.toEqual(
          new AppError("Id is required!")
        );
      });
    });
  });
});
