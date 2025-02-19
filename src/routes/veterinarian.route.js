import { Router } from "express";
import VeterinarianController from "../controllers/veterinarian.controller.js";
import { authenticateVeterinarian } from "../middlewares/auth.middleware.js";

const router = Router();
const veterinarianController = new VeterinarianController();

router.post('/register', (req, res) => veterinarianController.register(req, res));

router.get('/confirmar/:token', (req, res) => veterinarianController.confirmar(req, res));

router.post('/login', (req, res) => veterinarianController.login(req, res));

router.get('/profile', authenticateVeterinarian, (req, res) => veterinarianController.profile(req, res))

export default router;