const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//post - login page
router.post("/login", (req, res) => {
  let email = req.body.user_email;
  let checkuser = `SELECT * FROM user WHERE email = ?`;
  let value = [email];
  connection.query(checkuser, value, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
