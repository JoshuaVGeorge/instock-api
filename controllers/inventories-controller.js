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

const getSingleItem = (req, res) => {
	knex("inventories")
		.where({ id: req.params.id })
		.then((item) => {
			if (item == null) {
				res.status(404).send(`Item id: ${req.params.id} not found`);
			} else {
				res.status(200).send(item);
			}
		})
		.catch((err) => {
			res.status(500).send(`${err}`);
		});
};

module.exports = {
	getAllItems,
	getSingleItem
};
