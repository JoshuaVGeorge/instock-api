const knex = require("knex")(require("../knexfile"));

const get = (req, res) => {
	knex("inventories")
		.join("warehouses", "warehouses.id", "inventories.warehouse_id")
		.select("item_name", "warehouse_name")
		.then((data) => {
			res.send(data);
		});

	// .then((inventory) => {
	// 	let newInv = inventory.map(
	// 		({ created_at, updated_at, ...remainingProps }) => remainingProps
	// 	);
	// 	res.send(newInv);
	// });
};

module.exports = {
	get,
};
