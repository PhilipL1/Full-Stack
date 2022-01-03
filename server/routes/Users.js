const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { response } = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

//registration route
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

//login route

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // go to the username column where it equals to the typed login in
  let user = await Users.findOne({ where: { username: username } });
  //check if the user exist
  if (!user) return res.json({ error: "User Does Not Exist LOL!" });
  //bcypt.compare(password they are using to login, password in the database )
  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Wrong Username & Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id }, //from database
      "importantsecret" //random Strings as your secret token
    );
    res.json({ token: accessToken, username: username, id: user.id });
    // console.log(`answer >>> ` + match);
  });
});

router.get("/validate", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicInfo/:id", async (req, res) => {
  const userId = req.params.id;
  const basicInfo = await Users.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

router.put("/changePassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const username = req.user.username;
  let userDB = await Users.findOne({ where: { username: username } });
  bcrypt.compare(oldPassword, userDB.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong Password Entered" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { username: username } });
        res.json("SUCCESS");
      });
    }
  });
});

module.exports = router;
