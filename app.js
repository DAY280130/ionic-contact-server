const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "welcome to nyoba api",
  });
});

require("./app/routes/contact-routes")(app);
require("./app/routes/account-routes")(app);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
