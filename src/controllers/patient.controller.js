import Patient from "../models/patient.model.js";

class PatientController {

  async create(req, res) {
    const { name, owner, email, symptoms } = req.body;

    try {
      const pacient = new Patient(
        {
          name,
          owner,
          email,
          symptoms,
          veterinarian: req.veterinarian._id
        }
      );

      const newPatient = await pacient.save();
      res.status(201).json({ success: true, message: 'Patient created successfully', patient: newPatient });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getPatients(req, res) {
    try {      
      const patients = await Patient.find({ veterinarian: req.veterinarian._id });
      res.status(200).json({ success: true, message: 'Patients List', patients });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getPatientById(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.findById({ _id: id, veterinarian: req.veterinarian._id });
      if (!patient) {
        const error = new Error('Patient not found');
        return res.status(404).json({ success: false, message: error.message});
      }
      res.status(200).json({ success: true, message: 'Patient founded', patient });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updatePatientById(req, res) {
    const { id } = req.params;
    const { name, owner, email, date, symptoms } = req.body;

    const patientInDatabase = await Patient.findById({ _id: id });
    if (!patientInDatabase) {
      const error = new Error('Patient not found')
      return res.status(404).json({ success: false, message: error.message })
    }

    if (patientInDatabase.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
      const error = new Error('Action not valid')
      return res.status(401).json({ success: false, message: error.message })
    }
 
    patientInDatabase.name = name || patientInDatabase.name;
    patientInDatabase.owner = owner || patientInDatabase.owner;
    patientInDatabase.email = email || patientInDatabase.email;
    patientInDatabase.date = date || patientInDatabase.date;
    patientInDatabase.symptoms = symptoms || patientInDatabase.symptoms;

    try {
      const updatedPatient = await patientInDatabase.save();
      res.status(200).json({ success: true, message: 'Patient updated successfully', patient: updatedPatient })
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deletePatientById(req, res) {
    const { id } = req.params;

    const patientInDatabase = await Patient.findById({ _id: id });
    if (!patientInDatabase) {
      const error = new Error('Patient not found')
      return res.status(404).json({ success: false, message: error.message })
    }

    if (patientInDatabase.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
      const error = new Error('Action not valid')
      return res.status(401).json({ success: false, message: error.message })
    }
 
    try {
      await patientInDatabase.deleteOne();
      res.status(200).json({ success: true, message: 'Patient deleted successfully' })
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

}

export default PatientController;