import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "./config/db.js";
import veterinarianRoutes from "./routes/veterinarian.route.js";
import patientRoutes from "./routes/patient.route.js";


class App {

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('tiny'));
  }

  routes() {
    this.app.use('/api/v1/veterinarians', veterinarianRoutes);
    this.app.use('/api/v1/patients', patientRoutes);
  }
}

export default new App().app;