const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");
const Image = require("../image/model")

const router = express.Router();

router.post("/user", async (req, res, next) => {
  try {
    const userCredentials = {
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    if (!userCredentials.email || !userCredentials.password) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    } else {
      const createUser = await User.create(userCredentials);
      res.send(createUser);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const showUsers = await User.findAll({ include: [Image] });
    console.log(showUsers);
    res.send(showUsers);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", (req, res, next) => {
  User.findByPk(req.params.userId, { include: [Image] })
    .then(user => {
      if (!user) {
        res.status(404).end();
      } else {
        res.send(user);
      }
    })
    .catch(next);
});

module.exports = router;
