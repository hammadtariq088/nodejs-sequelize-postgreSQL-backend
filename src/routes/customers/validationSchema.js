const Joi = require("joi");

const createCustomerSchema = (customer) => {
  const schema = Joi.object().keys({
    orderId: Joi.number().positive().required("Order ID is required..."),
    customerName: Joi.string()
      .min(3)
      .max(25)
      .required("Customer Name is required..."),
    customerEmail: Joi.string().email().required("Email is required..."),
    addFields: Joi.array()
      .items(
        Joi.object().keys({
          productId: Joi.number()
            .positive()
            .required("Product ID is required..."),
          productName: Joi.string()
            .min(3)
            .max(25)
            .required("Product Name is required..."),
          productPrice: Joi.number()
            .positive()
            .required("Product Price is required..."),
          productQuantity: Joi.number()
            .positive()
            .required("Product Quantity is required..."),
          productTotal: Joi.number()
            .positive()
            .required("Product Total is required..."),
        })
      )
      .required("These fields are required..."),
    address: Joi.string().min(10).max(30).required("Mention your address..."),
    city: Joi.string().required("Mention your city..."),
    zipCode: Joi.number().positive().required("zip code is required..."),
  });

  return schema.validate(customer);
};

module.exports = createCustomerSchema;
