const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");

router
	.route("/")
	.get((req, res) => {
		res.send("welcome to warehouses");
	})
	.post(warehouseController.add);

router
	.route("/:id")
	.get(warehouseController.get)
	.patch(warehouseController.update);

module.exports = router;
