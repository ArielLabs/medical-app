import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { SERVER_PORT } from "./environment";
import { insertUserAdmin } from "./BLL/authBLL";
import { routesInit } from "./routes/configRoutes";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(json());

routesInit(app);

app.listen(SERVER_PORT, () => {
  console.log(`Server running at: http://localhost:${SERVER_PORT}`);
  insertUserAdmin();
});
