import { Router } from "express";

import { CreateNgoController } from "../../useCases/createNgo/CreateNgoController";
import { FindNgoByIdController } from "../../useCases/findNgoById/FindNgoByIdController";

const createNgoController = new CreateNgoController();
const findNgoByIdController = new FindNgoByIdController();

const router = Router();

router.post("/ngo", createNgoController.handle);
router.get("/ngo/:id", findNgoByIdController.handle);

export { router };
