const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - library page
router.get("/library/:userid", (req, res) => {
  let uid = req.params.userid;
  //console.log(uid);
  let readsql = `SELECT * FROM collection WHERE user_id =? ;`;
  let values = [uid];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - library page
router.post("/library/:userid", (req, res) => {
  let collectionname = req.body.collection;
  let userId = req.body.us_id;
  let readsql = ` SELECT * FROM collection INNER JOIN vinyl ON collection.collection_id = vinyl.collection_id WHERE collection.collection_name =? AND collection.user_id = ?;SELECT * FROM collection WHERE user_id =? ;`;
  let values = [collectionname, userId, userId];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
