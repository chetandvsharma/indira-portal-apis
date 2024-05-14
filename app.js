import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from './src/routes/index.routes.js';

const app = express();

// Configure CORS with allowed origin
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // Allow requests from this origin
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
routes(app);

export default app;
