module.exports = (app) => {
  const accounts = require("../controllers/account-controller");
  const router = require("express").Router();

  router.get("/", accounts.findAll);
  router.get("/:id", accounts.find);
  router.post("/", accounts.create);
  router.put("/:id", accounts.update);
  router.delete("/:id", accounts.delete);

  // Custom url (endpoint)
  app.use("/api/accounts", router);
};
