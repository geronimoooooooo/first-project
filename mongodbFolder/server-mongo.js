import express from "express";
import connectDB from "./mongoose/db.js";   // <- add this
import ArticleRouter from "./mongoose/ArticleRouter.js";   // <- add this
 
const app = express();
const PORT = 3000;
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ArticleRouter);   // <- add

connectDB();      

app.get("/", (request, response) => {
  response.send({ message: "Hello from an Express API!" });
});
 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});