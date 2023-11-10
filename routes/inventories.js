const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/", (req, res) => {
	res.send("welcome to inventories");
});

module.exports = router;
