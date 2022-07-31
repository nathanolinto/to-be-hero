import { Router } from "express";

import { CreateNgoController } from "../../useCases/createNgo/CreateNgoController";

const createNgoController = new CreateNgoController();

const router = Router();

router.post("/ngo", createNgoController.handle);

export { router };
