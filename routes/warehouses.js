const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("welcome to warehouses");
});

router.get("/:id", (req, res) => {
	res.send(`welcome to ${req.params.id}`);
});
module.exports = router;
