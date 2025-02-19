import jwt from "jsonwebtoken";


export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h'});
  return token;
}

export const verifyToken = (token ) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}