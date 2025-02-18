import mongoose from "mongoose";


class MongoDatabase {
  
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI);
      const url = `${db.connection.host}:${db.connection.port}`;
      console.log(`Mongo Database connected to: ${url}`)
    } catch (err) {
      console.log(`Mongo Database connection error: ${err}`);
    }
  }

  static getInstance() {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

}

export default MongoDatabase.getInstance();