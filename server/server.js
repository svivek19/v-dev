const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes/routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", router);

const PORT = process.env.PORT;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting server:", error);
  process.exit(1);
}
