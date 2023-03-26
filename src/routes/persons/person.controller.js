const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../../db/models");
const { createPersonSchema, authPersonSchema } = require("./validationSchema");
const { generateAuthToken } = require("../../utils/helpers");
const { authHandler, emailHandler } = require("../../middleware/auth");
const { Person } = db;

// Retrieve all Persons
router.get("/", authHandler, async (req, res) => {
  const data = await Person.findAll();
  if (data) {
    res.status(200).send(data);
  } else {
    res
      .status(400)
      .send({ message: "There is some error in getting persons data" });
  }
});

// Retrieve a single Person with id
router.get("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const data = await Person.findByPk(id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(400).send({
      message: `Cannot find Person with id=${id}.`,
    });
  }
});

// Update a Person with id
router.put("/:id", authHandler, async (req, res) => {
  const id = req.params.id;
  const num = await Person.update(req.body, {
    where: { id: id },
  });

  if (num == 1) {
    res.status(200).send({
      message: "Person was updated successfully.",
    });
  } else {
    res.status(400).send({
      message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`,
    });
  }
});

// Delete a Person with id
router.delete("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const num = await Person.destroy({
    where: { id: id },
  });
  if (num == 1) {
    res.status(200).send({
      message: "Person was deleted successfully!",
    });
  } else {
    res.status(400).send({
      message: `Cannot delete Person with id=${id}. Maybe Person was not found!`,
    });
  }
});

// Delete all persons
router.delete("/", authHandler, async (req, res) => {
  const nums = await Person.destroy({
    where: {},
    truncate: false,
  });
  res
    .status(200)
    .send({ message: `${nums} Persons were deleted successfully!` });
});

// Create a new Person
router.post("/register", emailHandler, async (req, res) => {
  const payload = req.body;

  // Validate request
  const validatePayload = createPersonSchema(payload);
  const { error } = validatePayload;
  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  // Save Person in the database
  const data = await Person.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    religion: req.body.religion,
    nationality: req.body.nationality,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  res
    .status(200)
    .send({ message: "Person registered successfully...", data: data });
});

// Authenticate a Person
router.post("/login", async (req, res) => {
  const payload = req.body;

  // Validate request
  const validatePayload = authPersonSchema(payload);
  const { error } = validatePayload;

  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  const person = await Person.findOne({
    where: {
      email: payload.email,
    },
  });

  if (person) {
    const isSamePassword = bcrypt.compareSync(
      payload.password,
      person.password
    );

    if (isSamePassword) {
      const token = generateAuthToken(payload);
      // res.cookie("jwtToken", token, {
      //   maxAge: 1 * 24 * 60 * 60,
      //   httpOnly: true,
      // });
      console.log(token);
      res.status(200).send(person);
    } else {
      res.status(400).send({ message: "Authentication Failed..." });
    }
  } else {
    res.status(400).send({ message: "Authentication Failed..." });
  }
});

module.exports = router;
