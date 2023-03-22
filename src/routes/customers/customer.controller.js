const express = require("express");
const router = express.Router();
const { db } = require("../../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create a new Customer
router.post("/", async (req, res) => {
  // Validate request
  if (!req.body.customerName) {
    res.status(400).send({
      message: "Customer name can not be empty!",
    });
    return;
  }

  // Create a Customer
  const payload = req.body;

  // Save Customer in the database
  const data = await Customer.create(payload);
  res.status(200).send(data);
});

// Retrieve all Customers
router.get("/", (req, res) => {
  const customerName = req.query.customerName;
  let condition = customerName
    ? { customerName: { [Op.iLike]: `%${customerName}%` } }
    : null;

  Customer.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
});

// Retrieve a single Customer with id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Customer with id=${id}`,
      });
    });
});

// Update a Customer with id
router.put("/:id", (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Customer with id=${id}`,
      });
    });
});

// Delete a Customer with id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Customer with id=${id}`,
      });
    });
});

// Create a new Tutorial
router.delete("/", (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customerss.",
      });
    });
});

module.exports = { router };
