import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";
import { authenticateVeterinarian } from "../middlewares/auth.middleware.js";
import { verifyIsObjectId } from "../middlewares/object.id.middleware.js";


const router = Router();
const patientController = new PatientController();

router.post('/', authenticateVeterinarian, (req, res) => patientController.create(req, res));
router.get('/', authenticateVeterinarian, (req, res) => patientController.getPatients(req, res));
router.get('/:id', [verifyIsObjectId, authenticateVeterinarian], (req, res) => patientController.getPatientById(req, res));
router.put('/:id', [verifyIsObjectId, authenticateVeterinarian], (req, res) => patientController.updatePatientById(req, res));
router.delete('/:id', [verifyIsObjectId, authenticateVeterinarian], (req, res) => patientController.deletePatientById(req, res));

export default router;