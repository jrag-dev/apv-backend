import { Schema, model } from "mongoose";
import { generarId } from "../helpers/generarId.js";

const veterinarianSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: null,
      trim: true
    },
    web: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: generarId()
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Veterinarian', veterinarianSchema);