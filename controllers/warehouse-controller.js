const knex = require("knex")(require("../knexfile"));

const getWarehouseID = (req, res) => {
	knex("warehouses")
		.where({ id: req.params.id })
		.then((warehouse) => {
			let splicedWarehouse = warehouse.map(
				({ created_at, updated_at, ...remainingProps }) => remainingProps
			);

			if (warehouse == false) {
				res.status(404).send(`warehouse id: ${req.params.id} not found`);
			} else {
				res.status(200).send(splicedWarehouse);
			}
		})
		.catch((err) => {
			res.status(500).send(`${err}`);
		});
};

const getWarehouseInventory = (req, res) => {
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

const add = (req, res) => {
	if (!req.body.contact_name || !req.body.contact_email) {
		return res
			.status(400)
			.send("Please provide name and email for the user in the request");
	}

	if (
		!req.body.warehouse_name ||
		!req.body.address ||
		!req.body.city ||
		!req.body.country ||
		!req.body.contact_position ||
		!req.body.contact_phone
	) {
		return res.status(400).send("Please provide all the details");
	}

	knex("warehouses")
		.insert(req.body)
		.then((result) => {
			return knex("warehouses").where({ id: result[0] });
		})
		.then((addedWarehouse) => {
			res.status(201).json(addedWarehouse);
		})
		.catch(() => {
			res.status(500).json({ message: "Unable to create new user" });
		});
};

const update = (req, res) => {
	knex("warehouses")
		.where({ id: req.params.id })
		.update(req.body)
		.then(() => {
			return knex("warehouses").where({
				id: req.params.id,
			});
		})
		.then((updatedWarehouse) => {
			res.json(updatedWarehouse[0]);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: `Unable to update user with ID: ${req.params.id}` });
		});
};

module.exports = {
	getWarehouseID,
	getWarehouseInventory,
	add,
	update,
};
