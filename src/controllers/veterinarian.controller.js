import { compare, hashed } from "../helpers/bcrypt.js";
import emailForgotPassword from "../helpers/emailForgotPassword.js";
import emailRegister from "../helpers/emailRegister.js";
import { generarId } from "../helpers/generarId.js";
import { createToken } from "../helpers/jwt.js";
import Veterinarian from "../models/veterinarians.model.js";


class VeterinarianController {

  async register(req, res) {
    const { name, email, password, phone, web } = req.body;

    try {
      const veterinariandb = await Veterinarian.findOne({ email });
      if (veterinariandb) {
        const error = new Error('Email already registered');
        return res.status(400).json({
          success: false,
          message: error.message
        })
      }

      const hashedPassword = await hashed(password);

      const newVeterinarian = new Veterinarian(
        {
          name,
          email,
          password: hashedPassword,
          phone,
          web
        }
      )
      const veterinarian = await newVeterinarian.save();

      // Send email to confirmate a new veterinarian
      emailRegister({
        email,
        name,
        token: veterinarian.token
      });

      res.status(201).json(
        { 
          success: true, 
          message: 'Veterinarians created successfully', 
          veterinarian
        }
      );
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async confirmar(req, res) {
    const { token } = req.params;
    try {
      const veterinarian = await Veterinarian.findOne({ token });
      if (!veterinarian) {
        const error = new Error('Token not valid');
        return res.status(400).json({ success: false, message: error.message });
      }
      veterinarian.token = null;
      veterinarian.confirmed = true;

      await veterinarian.save()
      res.status(200).json({ success: true, message: 'Veterinarian confirmed successfully'});
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const veterinariandb = await Veterinarian.findOne({ email });
      if (!veterinariandb) {
        const error = new Error('This email is not registered');
        return res.status(400).json({
          success: false,
          message: error.message
        })
      }

      const passwordCorrect = await compare(password, veterinariandb.password);
      if (!passwordCorrect) {
        const error = new Error('Incorrect password');
        return res.status(400).json({
          success: false,
          message: error.message
        })
      }

      if (!veterinariandb.confirmed) {
        const error = new Error('You must confirm your account');
        return res.status(403).json({
          success: false,
          message: error.message
        })
      }

      const payload = {
        id: veterinariandb._id
      }
      const token = createToken(payload);

      res.status(200).json(
        { 
          success: true, 
          message: 'Veterinarians logged successfully',
          token
        }
      );
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    const veterinarian = await Veterinarian.findOne({ email }, { password: 0 });
    if (!veterinarian) {
      const error = new Error('The veterinarian not exist');
      return res.status(404).json({ success: false, message: error.message });
    }

    try {
      veterinarian.token = generarId();
      await veterinarian.save();

      // Sent email for reset password
      emailForgotPassword(
        {
          email,
          name: veterinarian.name,
          token: veterinarian.token
        }
      )

      res.status(200).json({ success: true, message: 'An email has been sent with instructions to change the password'})
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async checkToken(req, res) {
    const { token } = req.params;

    const isTokenValid = await Veterinarian.findOne({ token }, { password: 0});
    if (isTokenValid) {
      res.status(200).json({ success: true, message: 'Enter you new password'})
    } else {
      const error = new Error('Invalid token');
      return res.status(400).json({ success: false, message: error.message });
    }

  }

  async newPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    const veterinarian = await Veterinarian.findOne({ token });
    if (!veterinarian) {
      const error = new Error('The veterinarian not exist');
      return res.status(404).json({ success: false, message: error.message });
    }

    try {
      veterinarian.token = null;
      const hashedPassword = await hashed(password);
      veterinarian.password = hashedPassword;
      await veterinarian.save();
      res.status(200).json({ success: true, message: 'password changed successfully'})
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async profile(req, res) {
    const { veterinarian } = req;
    res.status(200).json({ success: true, message: 'Veterinarian profile', perfil: veterinarian })
  }

}

export default VeterinarianController;