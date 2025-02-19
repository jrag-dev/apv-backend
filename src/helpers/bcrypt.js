import bcrypt from "bcrypt";

export const hashed = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
}

export const compare = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
}