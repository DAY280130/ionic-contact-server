const bcrypt = require("bcrypt");
const db = require("../models");
const Account = db.accounts;

// exports.findAll = (req, res) => {
//   Account.find()
//     .then((result) => res.send(result))
//     .catch((error) => res.status(500).send({ message: error.message || "unknown error occured while getting all data" }));
// };

// exports.find = (req, res) => {
//   const id = req.params.id;

//   Account.findById(id)
//     .then((result) => res.send(result))
//     .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while getting data" }));
// };

exports.getToken = (req, res) => {
  Account.findOne({ username: req.body.username })
    .then((result) => {
      if (!result) {
        // username tidak ditemukan
        res.status(404).send({ login_status: "failed" });
      } else {
        bcrypt
          .compare(req.body.password, result.password)
          .then((cryptresult) => {
            if (cryptresult === true) {
              res.send({
                username: result.username,
                token: Date.now() + result.password,
                login_status: "success",
              });
            } else {
              // password salah
              res.status(404).send({ login_status: "failed" });
            }
          })
          .catch((err) => res.status(409).send({ message: err.message || "unknown error occured while comparing password" }));
      }
    })
    .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while finding data" }));
};

exports.create = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const account = new Account({
        username: req.body.username,
        password: hash,
      });

      account
        .save(account)
        .then((result) => res.send(result))
        .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while inserting data" }));
    })
    .catch((error) => res.status(409).send({ message: error || "unknown error occured while hashing password" }));
};

// exports.update = (req, res) => {
//   const id = req.params.id;

//   Account.findByIdAndUpdate(id, req.body)
//     .then((result) => {
//       if (!result) {
//         res.status(404).send({ message: "Data not found" });
//       } else {
//         res.send({ message: "Data updated successfully" });
//       }
//     })
//     .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while updating data" }));
// };

// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Account.findByIdAndRemove(id)
//     .then((result) => {
//       if (!result) {
//         res.status(404).send({ message: "Data not found" });
//       } else {
//         res.send({ message: "Data deleted successfully" });
//       }
//     })
//     .catch((error) => res.status(409).send({ message: error.message || "unknown error occured while deleting data" }));
// };
