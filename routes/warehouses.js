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
			if (warehouse == false) {
				res.status(400).send(`No warehouse id: ${req.params.id} found`);
			} else {
				res.status(200).send(warehouse);
			}
		})
		.catch((err) => {
			res.status(500).send(`${err}`);
		});
});

module.exports = router;
