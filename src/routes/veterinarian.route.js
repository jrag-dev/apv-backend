import { Router } from "express";
import VeterinarianController from "../controllers/veterinarian.controller.js";
import { authenticateVeterinarian } from "../middlewares/auth.middleware.js";

const router = Router();
const veterinarianController = new VeterinarianController();

// Public routes
router.post('/register', (req, res) => veterinarianController.register(req, res));
router.get('/confirmar/:token', (req, res) => veterinarianController.confirmar(req, res));
router.post('/login', (req, res) => veterinarianController.login(req, res));
router.post('/forgot-password', (req, res) => veterinarianController.forgotPassword(req, res)); // validate email
router.get('/forgot-password/:token', (req, res) => veterinarianController.checkToken(req, res)); // send token
router.post('/forgot-password/:token', (req, res) => veterinarianController.newPassword(req, res)); // new password

// Private routes
router.get('/profile', authenticateVeterinarian, (req, res) => veterinarianController.profile(req, res))
router.put('/profile/:id', authenticateVeterinarian, (req, res) => veterinarianController.updateProfile(req, res));
router.put('/update-password', authenticateVeterinarian, (req, res) => veterinarianController.updatePassword(req, res));

export default router;