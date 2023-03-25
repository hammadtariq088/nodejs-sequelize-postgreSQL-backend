const Joi = require("joi");

// For registeration
const createPersonSchema = (person) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .min(3)
      .max(25)
      .required("First Name is required..."),
    lastName: Joi.string().min(3).max(25).required("Last Name is required..."),
    email: Joi.string().email().required("Email is required..."),
    gender: Joi.string().required("Gender is required..."),
    religion: Joi.string().required("Gender is required..."),
    nationality: Joi.string().required("Gender is required..."),
    password: Joi.string().required("Password is required..."),
  });

  return schema.validate(person);
};

// for login
const authPersonSchema = (person) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required("Email is required..."),
    password: Joi.string().required("Password is required..."),
  });

  return schema.validate(person);
};

module.exports = { createPersonSchema, authPersonSchema };
