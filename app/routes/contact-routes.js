module.exports = (app) => {
  const contacts = require("../controllers/contact-controller");
  const router = require("express").Router();

  router.get("/", contacts.findAll);
  router.get("/:id", contacts.find);
  router.post("/", contacts.create);
  router.put("/:id", contacts.update);
  router.delete("/:id", contacts.delete);

  // Custom url (endpoint)
  app.use("/api/contacts", router);
};
