import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/route-collection.js";
import { createTablesIfNotExists } from "./database/create-tables.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};

createTablesIfNotExists();

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
