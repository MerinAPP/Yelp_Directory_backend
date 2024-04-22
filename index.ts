import mongoose from 'mongoose';
import app from './src/app';
import { local_config } from './src/config/config';

const port = local_config.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
});