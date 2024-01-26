const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

//get - genres page - get data for the buttons name
router.get("/genres", (req, res) => {
  let readsql = "SELECT * FROM genres ORDER BY genres_name ASC";
  connection.query(readsql, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

//get - genres page - search
router.get("/genres/:genrename", (req, res) => {
  let g_name = req.params.genrename;
  if (g_name === "All" || g_name === "undefined") {
    let readsql = "SELECT * FROM vinyl;";
    connection.query(readsql, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM genres INNER JOIN vinyl ON genres.genres_id = vinyl.genres_id WHERE genres_name = ?;`;
    let values = [g_name];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

//get - genres page - search and page
router.get("/genres/:genrename/:page/:limit", (req, res) => {
  let g_name = req.params.genrename;
  let r_page = req.params.page;
  let r_limit = req.params.limit;
  if (g_name === "All" || g_name === "undefined") {
    let readsql = `SELECT * FROM vinyl LIMIT ?,?;`;
    let values = [parseInt(r_page), parseInt(r_limit)];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  } else {
    let readsql = `SELECT * FROM genres INNER JOIN vinyl ON genres.genres_id = vinyl.genres_id WHERE genres_name = ? LIMIT ?,?;`;
    let values = [g_name, parseInt(r_page), parseInt(r_limit)];
    connection.query(readsql, values, (err, data) => {
      if (err) throw err;
      res.json({ data });
    });
  }
});

module.exports = router;
