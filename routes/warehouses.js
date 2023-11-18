const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");

router
	.route("/")
	.get(warehouseController.getAllWarehouses)
	.delete(warehouseController.deleteWarehouse)
	.post(warehouseController.add);

router
	.route("/:id")
	.get(warehouseController.getWarehouseID)
	.patch(warehouseController.update);

router.route("/:id/inventories").get(warehouseController.getWarehouseInventory);

module.exports = router;
