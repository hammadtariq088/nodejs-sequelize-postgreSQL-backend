const Joi = require("joi");

const createCustomerSchema = (customer) => {
  const schema = Joi.object().keys({
    customerName: Joi.string()
      .min(3)
      .max(25)
      .required("Customer Name is required..."),
    customerEmail: Joi.string().email().required("Email is required..."),
    address: Joi.string().min(10).max(30).required("Mention your address..."),
    city: Joi.string().required("Mention your city..."),
  });

  return schema.validate(customer);
};

module.exports = createCustomerSchema;
