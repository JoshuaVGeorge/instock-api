const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controller');

router.route("/")
.get((req, res) => {
	res.send("welcome to warehouses");
})
.post(warehouseController.add);

router.route("/:id")
// .get((req, res) => {
// 	knex("warehouses")
// 		.where({ id: req.params.id })
// 		.then((warehouse) => {
// 			let splicedWarehouse = warehouse.map(
// 				({ created_at, updated_at, ...remainingProps }) => remainingProps
// 			);

// 			if (warehouse == false) {
// 				res.status(404).send(`warehouse id: ${req.params.id} not found`);
// 			} else {
// 				res.status(200).send(splicedWarehouse);
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).send(`${err}`);
// 		});
// })
.patch(warehouseController.update);

module.exports = router;
