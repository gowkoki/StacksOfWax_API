const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get - artist - list of records
router.get("/artistVinylRecord/:artistid", (req, res) => {
  let a_id = req.params.artistid;
  let readsql = `SELECT * FROM vinyl INNER JOIN artist ON vinyl.artist_id = artist.atrist_id WHERE artist_id = ?;SELECT artist_name FROM artist WHERE atrist_id = ?;`;
  let values = [a_id, a_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
