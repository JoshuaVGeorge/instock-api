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
	knex("warehouses")
		.where({ id: req.params.id })
		.then((warehouse) => {
			if (warehouse == false) {
				res.status(404).send(`warehouse id: ${req.params.id} not found`);
			} else {
				knex("inventories as i")
					.join("warehouses as w", "w.id", "i.warehouse_id")
					.select("i.id", "i.item_name", "i.category", "i.status", "i.quantity")
					.where({ "w.id": req.params.id })
					.then((inventory) => {
						res.status(200).send(inventory);
					})
					.catch((err) => {
						res.status(500).send(`${err}`);
					});
			}
		});
};

module.exports = {
	getAllItems,
	getItemByWarehouse,
};
