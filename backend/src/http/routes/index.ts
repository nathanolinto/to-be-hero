import { Router } from "express";

import { CreateNgoController } from "../../useCases/createNgo/CreateNgoController";
import { FindNgoByIdController } from "../../useCases/findNgoById/FindNgoByIdController";
import { CreateIncidentController } from "../../useCases/createIncident/CreateIncidentController";

const createNgoController = new CreateNgoController();
const findNgoByIdController = new FindNgoByIdController();
const createIncidentController = new CreateIncidentController();

const router = Router();

router.post("/ngos", createNgoController.handle);
router.get("/ngos/:id", findNgoByIdController.handle);
router.post("/incidents", createIncidentController.handle);

export { router };
