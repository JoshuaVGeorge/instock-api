const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.route("/").get((req, res) => {
	knex("inventories").then((inventory) => {
		let newInv = inventory.map(
			({ created_at, updated_at, ...remainingProps }) => remainingProps
		);
		res.send(newInv);
	});
});

module.exports = router;
