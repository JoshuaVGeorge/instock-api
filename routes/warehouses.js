const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");
const inventoriesController = require("../controllers/inventories-controller");

router
	.route("/")
	.get((req, res) => {
		res.send("welcome to warehouses");
	})
	.post(warehouseController.add);

router
	.route("/:id")
	.get(warehouseController.getWarehouseID)
	.patch(warehouseController.update);

router.route("/:id/inventories").get(inventoriesController.getItemByWarehouse);

module.exports = router;
