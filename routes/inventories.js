const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventories-controller");

router.route("/").get(inventoriesController.get);

module.exports = router;
