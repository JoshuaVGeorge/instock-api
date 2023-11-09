const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("welcome to warehouses");
});

module.exports = router;
