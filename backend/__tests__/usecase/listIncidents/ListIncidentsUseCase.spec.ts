import { container } from "tsyringe";

import { IIncidentsRepository } from "../../../src/repositories/IIncidentsRepository";
import { IncidentsRepository } from "../../../src/infra/mongoose/repositories/IncidentsRepository";
import { ListIncidentsUseCase } from "../../../src/useCases/listIncidents/ListIncidentsUseCase";

container.registerSingleton<IIncidentsRepository>(
  "IncidentsRepository",
  IncidentsRepository
);

describe("CreateIncidentUseCase Tests", () => {
  let listIncidentsUseCase: ListIncidentsUseCase;

  const listMock = {
    records: [
      {
        _id: "id",
        title: "title",
        description: "description",
        value: 1,
        ngo: "ong",
      },
      {
        _id: "id",
        title: "title",
        description: "description",
        value: 1,
        ngo: "ong",
      },
      {
        _id: "id",
        title: "title",
        description: "description",
        value: 1,
        ngo: "ong",
      },
    ],
    totalRecords: 3,
    totalPages: 1,
    page: 1,
  };

  beforeEach(() => {
    listIncidentsUseCase = container.resolve(ListIncidentsUseCase);
  });

  describe("listIncidentsUseCase Tests", () => {
    it("shoud be list Incident", async () => {
      IncidentsRepository.prototype.list = jest
        .fn()
        .mockResolvedValueOnce(listMock);

      const incidents = await listIncidentsUseCase.execute({});

      expect(incidents).toHaveProperty("records");
      expect(incidents.totalRecords).toEqual(3);
    });
  });
});
