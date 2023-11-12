const knex = require("knex")(require("../knexfile"));

const getAllItems = (req, res) => {
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
		})
		.catch((err) => {
			res.status(500).send(`${err}`);
		});
};

const getItemByWarehouse = (req, res) => {
	knex("warehouses as w")
		.join("inventories as i", "w.id", "i.warehouse_id")
		.select(
			"i.id",
			"i.item_name",
			"i.category",
			"i.status",
			"i.quantity",
			"w.warehouse_name"
		)
		.where({ "w.id": req.params.id })
		.then((data) => {
			res.send(data);
		});
};

module.exports = {
	getAllItems,
	getItemByWarehouse,
};
