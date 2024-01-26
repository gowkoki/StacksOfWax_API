const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get - myprofile page
router.get("/myprofile/:userid", (req, res) => {
  let u_id = req.params.userid;
  let readsql = `SELECT * FROM user WHERE user_id = ?;`;
  let values = [u_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - edit profile
router.post("/myprofile/editprofile/:userid", (req, res) => {
  let f_name = req.body.first_name;
  let l_name = req.body.last_name;
  let emailid = req.body.user_email;
  let user_id = req.body.u_id;

  let createsql = `UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE user.user_id = ?;`;
  let values = [f_name, l_name, emailid, user_id];
  connection.query(createsql, values, (err, data, fields) => {
    if (err) {
      res.json({ err });
      throw err;
    } else {
      console.log(data);
      res.json({ data });
    }
  });
});

// post - edit profile
router.post("/myprofile/:userid", (req, res) => {
  let f_name = req.body.first_name;
  let l_name = req.body.last_name;
  let emailid = req.body.user_email;
  let passwordnew = req.body.newpassword;
  let user_id = req.params.userid;

  let createsql = `UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user.user_id = ?;`;
  let values = [f_name, l_name, emailid, passwordnew, user_id];
  connection.query(createsql, values, (err, data, fields) => {
    if (err) {
      res.json({ err });
      throw err;
    } else {
      res.json({ data });
    }
  });
});

//delete - myprofile
router.delete("/myprofile/:userid", (req, res) => {
  let u_id = req.params.userid;
  let readsql = `DELETE FROM user WHERE user.user_id= ?;`;
  let value = [u_id];
  connection.query(readsql, value, (err, data, fields) => {
    if (err) throw err;
    console.log(data);
    res.json({ data });
  });
});

module.exports = router;
