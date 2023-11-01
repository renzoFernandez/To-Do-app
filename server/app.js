import express from "express";
import router from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(router);

export default app;
