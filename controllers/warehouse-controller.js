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

  module.exports = {
    add
  }