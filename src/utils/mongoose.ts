import { connect, set } from "mongoose";
import { local_config } from "../config/config";

// connection to db
(async () => {
  try {
    set("strictQuery", false);
    const db = await connect(local_config.MONGO_DB_CONNECTION);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
