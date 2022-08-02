import { Router } from "express";

import { CreateNgoController } from "../../useCases/createNgo/CreateNgoController";
import { FindNgoByIdController } from "../../useCases/findNgoById/FindNgoByIdController";
import { CreateIncidentController } from "../../useCases/createIncident/CreateIncidentController";
import { ListIncidentsByNgoIdController } from "../../useCases/listIncidentsByNgoId/ListIncidentsByNgoIdController";
import { DeleteIncidentController } from "../../useCases/deleteIncident/DeleteIncidentController";

const createNgoController = new CreateNgoController();
const findNgoByIdController = new FindNgoByIdController();
const createIncidentController = new CreateIncidentController();
const listIncidentsByNgoIdController = new ListIncidentsByNgoIdController();
const deleteIncidentController = new DeleteIncidentController();

const router = Router();

router.post("/ngos", createNgoController.handle);
router.get("/ngos/:id", findNgoByIdController.handle);
router.post("/incidents", createIncidentController.handle);
router.get("/incidents/:ngoId", listIncidentsByNgoIdController.handle);
router.delete("/incidents", deleteIncidentController.handle);

export { router };
