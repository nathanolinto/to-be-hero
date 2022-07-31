import { container } from "tsyringe";

import { INgosRepository } from "../../../src/repositories/INgosRepository";
import { NgosRepository } from "../../../src/infra/mongoose/repositories/NgosRepository";
import { CreateNgoUseCase } from "../../../src/useCases/createNgo/CreateNgoUseCase";
import { AppError } from "../../../src/erros/AppErros";

container.registerSingleton<INgosRepository>("NgosRepository", NgosRepository);

describe("CreateNgoUseCase Tests", () => {
  let createNgoUseCase: CreateNgoUseCase;

  const ngoMock = {
    _id: "id",
    name: "name",
    email: "email",
    whatsapp: "whatsapp",
    city: "city",
    uf: "uf",
  };

  beforeEach(() => {
    createNgoUseCase = container.resolve(CreateNgoUseCase);
  });

  describe("createNgoUseCase Tests", () => {
    it("shoud be create Ngo", async () => {
      NgosRepository.prototype.create = jest
        .fn()
        .mockResolvedValueOnce(ngoMock);
      NgosRepository.prototype.findByName = jest
        .fn()
        .mockResolvedValueOnce(null);
      NgosRepository.prototype.findByEmail = jest
        .fn()
        .mockReturnValueOnce(null);

      const createdNgo = await createNgoUseCase.execute(ngoMock);

      expect(createdNgo).toHaveProperty("_id");
      expect(createdNgo.name).toEqual(ngoMock.name);
    });

    describe("Shoud be return error", () => {
      it("Ngo already exists", async () => {
        NgosRepository.prototype.findByName = jest
          .fn()
          .mockReturnValueOnce(ngoMock);

        await expect(createNgoUseCase.execute(ngoMock)).rejects.toEqual(
          new AppError("Ngo already exists!")
        );
      });
      it("Email already exists", async () => {
        NgosRepository.prototype.findByEmail = jest
          .fn()
          .mockReturnValueOnce(ngoMock);

        await expect(createNgoUseCase.execute(ngoMock)).rejects.toEqual(
          new AppError("E-mail already exists!")
        );
      });
      it("Name not Null", async () => {
        await expect(
          createNgoUseCase.execute({ ...ngoMock, name: "" })
        ).rejects.toEqual(new AppError("Name is required!"));
      });
      it("Email not Null", async () => {
        await expect(
          createNgoUseCase.execute({ ...ngoMock, email: "" })
        ).rejects.toEqual(new AppError("E-mail is required!"));
      });
      it("Whatsapp not Null", async () => {
        await expect(
          createNgoUseCase.execute({ ...ngoMock, whatsapp: "" })
        ).rejects.toEqual(new AppError("Whatsapp is required!"));
      });
      it("City not Null", async () => {
        await expect(
          createNgoUseCase.execute({ ...ngoMock, city: "" })
        ).rejects.toEqual(new AppError("City is required!"));
      });
      it("UF not Null", async () => {
        await expect(
          createNgoUseCase.execute({ ...ngoMock, uf: "" })
        ).rejects.toEqual(new AppError("UF is required!"));
      });
    });
  });
});
