import { verifyToken } from "../helpers/jwt.js";
import Veterinarian from "../models/veterinarians.model.js";

export async function authenticateVeterinarian (req, res, next) {
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization?.slice(7, );

    try {
      const decoded = verifyToken(token);
      req.veterinarian = await Veterinarian.findById({ _id: decoded.id }, { name: 1, email: 1, phone: 1, web: 1 })
      return next();
    } catch (err) {
      const error = new Error('Token invalid');
      return res.status(403).json({
        success: false,
        message: error.message
      })
    }
  }

  const error = new Error('You must send a token');
  return res.status(401).json({
    success: false,
    message: error.message
  });
}