const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//post - login page to check the email address
router.post("/register/checker", (req, res) => {
  let email = req.body.uemail;
  let checkuser = `SELECT * FROM user WHERE email = ?`;
  let value = [email];
  connection.query(checkuser, value, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - register page -insert the new user info
router.post("/register", (req, res) => {
  let firstname = req.body.fname;
  let lastname = req.body.lname;
  let email = req.body.uemail;
  let password = req.body.upassword;
  let createsql = `INSERT INTO user (user_id,first_name,last_name,email,password) VALUES(NULL, ? ,?, ? ,?)`;
  let values = [firstname, lastname, email, password];
  connection.query(createsql, values, (err, data) => {
    if (err) {
      res.json({ err });
      throw err;
    }
    if (data) {
      let respObj = {
        id: data.insertId,
      };
      res.json({ respObj });
    }
  });
});

module.exports = router;
