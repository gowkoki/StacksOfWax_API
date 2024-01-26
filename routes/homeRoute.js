const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - recently added & most liked records
router.get("/", (req, res) => {
  let readsql =
    "SELECT * FROM vinyl ORDER BY vinyl_id DESC LIMIT 12; SELECT vinyl.vinyl_id,vinyl.album_name,vinyl.img_url, COUNT(*) AS number FROM likes INNER JOIN vinyl ON likes.vinyl_id = vinyl.vinyl_id GROUP BY likes.vinyl_id ORDER BY number DESC LIMIT 12;";
  connection.query(readsql, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
