import Express from "express";
import vdhRouter from "./listeners/breeds";

const PORT = parseInt(process.env.PORT || "8080");

const app = Express();

app.use((req: Express.Request, _res: Express.Response, next: Express.NextFunction) => {
  console.log(`${new Date().toLocaleDateString()}: Requesting: ${req.path}`);
  next();
});

app.use("/breeds", vdhRouter);

app.listen(PORT, () => { console.log(`App is listening on port ${PORT}!`); });
