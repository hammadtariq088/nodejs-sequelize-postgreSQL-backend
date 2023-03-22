const express = require("express");
const { router } = require("./routes/customers/customer.controller");
const { db } = require("./models");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/customers", router);

app.listen(5000, () => console.log("App is listening at port 5000"));
