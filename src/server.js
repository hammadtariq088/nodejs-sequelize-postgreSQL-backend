const express = require("express");
// const { router } = require("./routes/customers/customer.controller");
const { router } = require("./routes/persons/person.controller");
// const { db } = require("./models");
// const db = require("../db/models");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// db.sequelize.sync();

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// app.use("/customers", router);
app.use("/persons", router);

app.listen(5000, () => console.log("App is listening at port 5000"));
