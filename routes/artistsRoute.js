const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get - artists page -search
router.get("/artists/:name", (req, res) => {
  let search = req.params.name;
  if (search === "undefined") {
    let readsql = "SELECT * FROM artist";
    connection.query(readsql, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM artist WHERE artist_name LIKE ?;`;
    let searchValue = `%${search}%`;
    connection.query(readsql, [searchValue], (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

//get - artists - search and page
router.get("/artists/:name/:page/:limit", (req, res) => {
  let search = req.params.name;
  let r_page = req.params.page;
  let r_limit = req.params.limit;
  if (search === "undefined") {
    let readsql = `SELECT * FROM artist LIMIT ?,?`;
    let values = [parseInt(r_page), parseInt(r_limit)];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM artist WHERE artist_name LIKE ? LIMIT ?,?;`;
    let searchValue = `%${search}%`;
    let values = [searchValue, parseInt(r_page), parseInt(r_limit)];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

module.exports = router;
