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

    const dominiosAllowed = [process.env.FRONTEND_URL];
    const corsOptions = {
      origin: function(origin, callback) {
        if (dominiosAllowed.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('No permitido por CORS'));
        }
      }
    }
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(morgan('tiny'));
  }

  routes() {
    this.app.use('/api/v1/veterinarians', veterinarianRoutes);
    this.app.use('/api/v1/patients', patientRoutes);
  }
}

export default new App().app;