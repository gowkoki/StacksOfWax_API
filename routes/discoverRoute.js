const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get discover page - search options
router.get("/discover/:name", (req, res) => {
  let search = req.params.name;
  if (search === "undefined") {
    let readsql = `SELECT * FROM vinyl ORDER BY vinyl.vinyl_id DESC;`;
    connection.query(readsql, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM vinyl 
    INNER JOIN artist ON vinyl.artist_id = artist.atrist_id
    INNER JOIN collection ON vinyl.collection_id = collection.collection_id
    INNER JOIN genres ON vinyl.genres_id = genres.genres_id
    WHERE vinyl.album_name LIKE ? OR artist.artist_name LIKE ?
    OR genres.genres_name LIKE ? OR collection.collection_name LIKE ? ;`;
    let searchValue = `%${search}%`;
    let values = [searchValue, searchValue, searchValue, searchValue];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

// get - discover page - search and page
router.get("/discover/:name/:page/:limit", (req, res) => {
  let search = req.params.name;
  let r_page = req.params.page;
  let r_limit = req.params.limit;
  if (search === "undefined") {
    let readsql = `SELECT * FROM vinyl ORDER BY vinyl.vinyl_id DESC LIMIT ?,? `;
    let values = [parseInt(r_page), parseInt(r_limit)];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM vinyl 
    INNER JOIN artist ON vinyl.artist_id = artist.atrist_id
    INNER JOIN collection ON vinyl.collection_id = collection.collection_id
    INNER JOIN genres ON vinyl.genres_id = genres.genres_id
    WHERE vinyl.album_name LIKE ? OR artist.artist_name LIKE ?
    OR genres.genres_name LIKE ? OR collection.collection_name LIKE ? LIMIT ?,? `;
    let searchValue = `%${search}%`;
    let values = [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      parseInt(r_page),
      parseInt(r_limit),
    ];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

module.exports = router;
