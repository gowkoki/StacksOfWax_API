const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get the collection info - setting page
router.get("/setting/:userid", (req, res) => {
  let u_id = req.params.userid;
  let readsql = `SELECT * FROM collection WHERE collection.user_id = ?;`;
  let value = [u_id];
  connection.query(readsql, value, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - setting page
router.post("/setting/:userid", (req, res) => {
  let collection_id = req.body.collection;
  let user_id = req.params.userid;
  let createsql = `SELECT * FROM vinyl INNER JOIN collection ON vinyl.collection_id = collection.collection_id WHERE vinyl.collection_id = ?;SELECT * FROM collection WHERE collection.user_id = ?;`;
  let values = [collection_id, user_id];
  connection.query(createsql, values, (err, data) => {
    if (err) {
      res.json({ err });
      throw err;
    } else {
      res.json({ data });
    }
  });
});

//delete collection - setting page
router.delete("/setting/:userid/:collectionid", (req, res) => {
  let u_id = req.params.userid;
  let c_id = req.params.collectionid;
  console.log(c_id);
  let readsql = `DELETE FROM collection WHERE collection.collection_id = ?;`;
  let value = [c_id];
  connection.query(readsql, value, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
