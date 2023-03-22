module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define(
    "customers",
    {
      customerName: {
        type: Sequelize.STRING,
      },
      customerEmail: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
    },
    {
      timeStamp: false,
    }
  );

  return Customers;
};
