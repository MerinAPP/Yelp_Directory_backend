import { config } from "dotenv";
config();

export const MONGO_DB_CONNECTION =
  process.env.MONGO_DB_URI || "mongodb+srv://yelpadmin:adminyelp@yelp.fm2hdwi.mongodb.net/";
