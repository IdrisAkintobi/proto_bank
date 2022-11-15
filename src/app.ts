import "dotenv/config";
import express, { json } from "express";
import morgan from "morgan";
import passport from "passport";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import notFoundMiddleware from "./middlewares/notFound";
import { jwtStrategy } from "./middlewares/protected";
import authRoutes from "./routes/auth.route";
import transactRoutes from "./routes/transact.route";

//Instantiate app
const app = express();

//Middlewares
passport.use(jwtStrategy);
app.use(json(), morgan("dev"));

//Routes
app.get("/", (_, res) => res.json({ message: "Connected" }));

app.use("/api/v1/user/", authRoutes);
app.use(
  "/api/v1/transact/",
  passport.authenticate("jwt", { session: false }),
  transactRoutes
);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
