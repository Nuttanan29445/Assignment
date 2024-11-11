const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

const historyRoute = require("./routes/history");
const stardardRoute = require("./routes/standard");

connectDB();

app.use(cors());
app.use(express.json());
app.use(historyRoute);
app.use(stardardRoute);

app.listen(3000);
