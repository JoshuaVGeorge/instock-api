const { response } = require("express");

const knex = require("knex")(require("../knexfile"));

const getAllItems = (req, res) => {
  knex("inventories as i")
    .join("warehouses as w", "w.id", "i.warehouse_id")
    .select(
      "i.id",
      "w.warehouse_name",
      "i.item_name",
      "i.description",
      "i.category",
      "i.status",
      "i.quantity"
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(`${err}`);
    });
};

const getSingleItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((item) => {
      if (item == null) {
        res.status(404).send(`Item id: ${req.params.id} not found`);
      } else {
        res.status(200).send(item);
      }
    })
    .catch((err) => {
      res.status(500).send(`${err}`);
    });
};

const deleteSingleItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Item with ID: ${req.params.id} to be deleted not found.`,
        });
      }

      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete item" });
    });
};

const updateSingleItem = (req, res) => {
  if (
    (!req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    req.body.category == "Please Select" ||
    !req.body.status ||
    !req.body.quantity)
  ) {
    res.status(400).send("Please fill in all fields");
    return;
  }

  if (isNaN(req.body.quantity)) {
    res.status(400).send("Please enter a number");
    return;
  }

  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .then((response) => {
      if (response.length === 0) {
        res.status(400).send("warehouse not found");
        return;
      }
      return knex("inventories")
        .where({ id: req.params.id })
        .select("id")
        .then((response) => {
          if (response.length === 0) {
            res.status(404).send("inventory item not found");
            return;
          }
          return knex("inventories")
            .where({ id: req.params.id })
            .update(req.body);
        })
        .then(() => {
          return knex("inventories").where({ id: req.params.id });
        })
        .then((updatedItem) => {
          res.json(updatedItem[0]);
        })
        .catch(() => {
          res.status(500);
        });
    });
};

const createNewItem = (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    res.status(400).send("Please fill in all fields");
    return;
  }
  if (isNaN(req.body.quantity)) {
    res.status(400).send("Please enter a number");
    return;
  }
  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .then((result) => {
      console.log({ result });
      if (result.length === 0) {
        res.status(400).send("warehouse not found");
        return;
      }
      knex("inventories")
        .insert(req.body)
        .then((result) => {
          console.log(`added  item successfully ${result}`);
          return knex("inventories").where({ id: result[0] });
        })
        .then((newItem) => {
          res.status(201).json(newItem);
          return newItem;
        });
    })
    .catch(() => {
      res.status(500);
    });
};

module.exports = {
  getAllItems,
  getSingleItem,
  deleteSingleItem,
  updateSingleItem,
  createNewItem,
};
