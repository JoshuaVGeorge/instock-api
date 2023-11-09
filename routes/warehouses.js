const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/", (req, res) => {
	res.send("welcome to warehouses");
});

router.route("/:id").get((req, res) => {
	knex("warehouses")
		.where({ id: req.params.id })
		.then((warehouse) => {
			res.status(200).json(warehouse);
		})
		.catch(() => {
			res.status(400).json({
				message: `Error getting warehouse ${req.params.id}`,
			});
		});
});
module.exports = router;
