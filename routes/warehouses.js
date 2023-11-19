const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");

router
	.route('/warehouse_ascending/warehouse')
	.get(warehouseController.sortWarehouseAscending)
// router
// 	.route('/warehouse_ascending')
// 	.get(warehouseController.getAscendingWarehouse)
router
router
	.route("/")
	.get(warehouseController.getAllWarehouses)
	.post(warehouseController.add);

router
	.route("/:id")
	.get(warehouseController.getWarehouseID)
	.delete(warehouseController.deleteWarehouse)
	.patch(warehouseController.update);

router.route("/:id/inventories").get(warehouseController.getWarehouseInventory);

module.exports = router;
