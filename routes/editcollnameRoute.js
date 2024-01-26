const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get - edit collection name
router.get("/editcollname/:userid/:collectionid", (req, res) => {
  let u_id = req.params.userid;
  let coll_id = req.params.collectionid;
  let readsql = `SELECT * FROM collection WHERE user_id = ? AND collection_id = ?;`;
  let values = [u_id, coll_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post -edit collection name
router.post("/editcollname/:userid/:collectionid", (req, res) => {
  let collection_name = req.body.collection;
  let coll_id = req.body.collection_id;
  let u_id = req.body.user_id;

  let createsql = `UPDATE collection SET collection_name = ? WHERE collection.collection_id = ?;`;
  let values = [collection_name, coll_id];
  connection.query(createsql, values, (err, data, fields) => {
    if (err) {
      res.json({ err });
      throw err;
    } else {
      res.json({ data });
    }
  });
});

module.exports = router;
