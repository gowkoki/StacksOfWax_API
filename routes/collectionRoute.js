const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - each collection records
router.get("/collection/:collectionid", (req, res) => {
  let c_id = req.params.collectionid;
  let readsql = `SELECT * FROM vinyl 
    INNER JOIN collection ON vinyl.collection_id = collection.collection_id 
    WHERE vinyl.collection_id = ?;SELECT collection_name FROM collection WHERE collection_id = ?;`;
  let values = [c_id, c_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
