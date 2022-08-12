import { errorHandler, notFound } from "./middlewares";

import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.sendStatus(200);
});

// Place your routes & routers here.

console.log("Adding a file change here");

app.use(notFound);
app.use(errorHandler);
export default app;
