import { config } from "dotenv";
config();

export const MONGO_DB_CONNECTION =
  process.env.MONGO_DB_URI || "mongodb+srv://ruthpp3:IalFOQzAlNjkLFI1@cluster0.u8gon1l.mongodb.net/merin?retryWrites=true&w=majority";

