const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// post - add a new collection
router.post("/addnewcollection/:userid", (req, res) => {
  let u_id = req.body.userid;
  let addnewcollection = req.body.newcollection;
  console.log(addnewcollection);
  let createsql = `INSERT INTO collection (collection_id,collection_name, user_id) VALUES (NULL,?,?);`;
  const values = [addnewcollection, u_id];
  connection.query(createsql, values, (err, data, fields) => {
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
