const express = require("express");
const app = express();

require("dotenv").config();

const { PORT } = process.env;

const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.get("/", function (req, res) {
	res.send("welcome to /");
});

app.listen(PORT, function () {
	console.log("server up!");
});
