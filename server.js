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
	res.send("welcome to instock-api");
});

// Routes
const warehouseRoutes = require("./routes/warehouses");
app.use("/api/warehouses", warehouseRoutes);

const inventoryRoutes = require("./routes/inventories");
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, function () {
	console.log("Instock-api launched!");
});
