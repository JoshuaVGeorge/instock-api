const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventories-controller");

router.route("/").get(inventoriesController.getAllItems);

module.exports = router;
