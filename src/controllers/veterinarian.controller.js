


class VeterinarianController {

  constructor(){

  }

  async register(req, res) {
    res.status(201).json({ success: true, message: 'Veterinarians created successfully'})
  }

  async login(req, res) {
    res.status(200).json({ success: true, message: 'Veterinarians logged successfully'})
  }

  async profile(req, res) {
    res.status(200).json({ success: true, message: 'Veterinarian profile'})
  }


}

export default VeterinarianController;