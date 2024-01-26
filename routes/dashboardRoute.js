const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - dashboard page
router.get("/dashboard/:userid", (req, res) => {
  let uid = req.params.userid;
  let readsql = `SELECT genres_name, COUNT(*) AS number FROM genres 
  INNER JOIN  vinyl ON genres.genres_id = vinyl.genres_id 
  INNER JOIN collection ON vinyl.collection_id = collection.collection_id
  INNER JOIN user ON collection.user_id = user.user_id 
  WHERE user.user_id = ? GROUP BY genres_name;SELECT collection_name, COUNT(*) AS number FROM vinyl
  INNER JOIN  collection ON vinyl.collection_id = collection.collection_id  
  INNER JOIN user ON collection.user_id = user.user_id
  WHERE user.user_id = ? GROUP BY vinyl.collection_id;SELECT COUNT(*) AS collection_count FROM collection
  INNER JOIN user ON collection.user_id = user.user_id
  WHERE user.user_id = ?;SELECT  COUNT(*) AS record_count FROM vinyl
  INNER JOIN collection ON vinyl.collection_id = collection.collection_id
  INNER JOIN user ON collection.user_id = user.user_id
  WHERE user.user_id = ? ;SELECT COUNT(DISTINCT vinyl.album_name) AS unique_record_count 
  FROM vinyl
  INNER JOIN collection ON vinyl.collection_id = collection.collection_id
  INNER JOIN user ON collection.user_id = user.user_id
  WHERE user.user_id = ?;`;
  let values = [uid, uid, uid, uid, uid];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
