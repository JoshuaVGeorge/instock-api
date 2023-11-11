const knex = require("knex")(require("../knexfile"));

const get = (req, res) => {
	knex("inventories as i")
		.join("warehouses as w", "w.id", "i.warehouse_id")
		.select(
			"i.id",
			"w.warehouse_name",
			"i.item_name",
			"i.description",
			"i.category",
			"i.status",
			"i.quantity"
		)
		.then((data) => {
			res.status(200).send(data);
		});
};

module.exports = {
	get,
};
