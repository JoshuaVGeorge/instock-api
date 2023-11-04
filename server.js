const express = require("express");
const app = express();

// env variables
require("dotenv").config();
const { PORT } = process.env;

// cors
const cors = require("cors");
app.use(cors());

// static assets
app.use(express.static("public"));

// json body parser
app.use(express.json());

// home route
app.get("/", function (req, res) {
	res.send("welcome to /");
});

// Routes
const warehouseRoutes = require("./routes/warehouse");
app.use("/warehouse", warehouseRoutes);

const inventoryRoutes = require("./routes/inventory");
app.use("/inventory", inventoryRoutes);

app.listen(PORT, function () {
	console.log("server up!");
});
