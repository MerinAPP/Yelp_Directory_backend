import { connect, set } from "mongoose";
import { local_config } from "../config/config";

// connection to db
(async () => {
  try {
    set("strictQuery", false);
    // console.log("local_config.MONGO_DB_URI", local_config.MONGO_DB_URI)
    const db = await connect(local_config.MONGO_DB_URI);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
