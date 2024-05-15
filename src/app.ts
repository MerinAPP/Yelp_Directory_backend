import { config } from "dotenv";
import "./utils/mongoose";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/index.middleware";
import api from "./api/index.api";
import { corsOptions } from "./config/corsOption";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import 'express-async-errors'
import { local_config } from "./config/config";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { errorHandler, successHandler } from "./config/morgna";

config();

const app = express();
if ((local_config.NODE_ENV === "development")) {
    app.use(morgan("dev"));
}
app.enable("trust proxy")
app.use(successHandler);
app.use(errorHandler);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(ExpressMongoSanitize());


app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));


app.use("/api/v1", api);



app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
