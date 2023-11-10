const knex = require('knex')(require('../knexfile'));

const add = (req, res) => {
    if (!req.body.contact_name || !req.body.contact_email) {
      return res
        .status(400)
        .send("Please provide name and email for the user in the request");
    }

    if (!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_position || !req.body.contact_phone) {
        return res
          .status(400)
          .send("Please provide all the details");
      }
  
    knex("warehouses")
      .insert(req.body)
      .then((result) => {
        return knex("warehouses")
          .where({ id: result[0] })
      })
      .then((addedWarehouse) => {
        res.status(201).json(addedWarehouse);
      })
      .catch(() => {
        res.status(500).json({ message: "Unable to create new user" });
      })
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
    add,
    update
  };