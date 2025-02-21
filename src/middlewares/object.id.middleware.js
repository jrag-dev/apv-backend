import mongoose from "mongoose";


export const verifyIsObjectId = (req, res, next) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('You must provide a valid Id')
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
}