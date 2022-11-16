const db = require("../models");
const Account = db.accounts;

exports.findAll = (req, res) => {
  Account.find()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send({ message: error.message || "unknown error occured while getting all data" }));
};

exports.find = (req, res) => {
  const id = req.params.id;

  Account.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while getting data" }));
};

exports.create = (req, res) => {
  const account = new Account({
    email: req.body.email,
    password: req.body.password,
  });

  account
    .save(account)
    .then((result) => res.send(result))
    .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while inserting data" }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  Account.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: "Data not found" });
      } else {
        res.send({ message: "Data updated successfully" });
      }
    })
    .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while updating data" }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Account.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: "Data not found" });
      } else {
        res.send({ message: "Data deleted successfully" });
      }
    })
    .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while deleting data" }));
};
