const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventories-controller");

router.route("/").get(inventoriesController.getAllItems);
router.route("/:id")
.get(inventoriesController.getSingleItem)
.delete(inventoriesController.deleteSingleItem)


module.exports = router;
