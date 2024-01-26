const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - record page
router.get("/record/:rowid", (req, res) => {
  let r_id = req.params.rowid;
  let readsql = `SELECT * FROM vinyl 
    INNER JOIN artist ON vinyl.artist_id = artist.atrist_id  
    INNER JOIN genres ON vinyl.genres_id = genres.genres_id
    INNER JOIN collection ON vinyl.collection_id = collection.collection_id
    INNER JOIN user ON collection.user_id = user.user_id
    WHERE vinyl_id = ?;SELECT * FROM tracks 
    WHERE vinyl_id = ?;SELECT * FROM review INNER JOIN user ON review.user_id = user.user_id WHERE vinyl_id = ?;`;
  let values = [r_id, r_id, r_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// get - record page
router.get("/record/:rowid/:userid", (req, res) => {
  let r_id = req.params.rowid;
  let u_id = req.params.userid;
  let readsql = `SELECT * FROM vinyl 
    INNER JOIN artist ON vinyl.artist_id = artist.atrist_id  
    INNER JOIN genres ON vinyl.genres_id = genres.genres_id
    INNER JOIN collection ON vinyl.collection_id = collection.collection_id
    INNER JOIN user ON collection.user_id = user.user_id
    WHERE vinyl_id = ${r_id};SELECT * FROM tracks 
    WHERE vinyl_id = ${r_id};SELECT * FROM review INNER JOIN user ON review.user_id = user.user_id WHERE vinyl_id = ${r_id};SELECT likes.like_status FROM likes WHERE likes.vinyl_id = ${r_id} AND likes.user_id =${u_id};`;
  let values = [r_id, r_id, r_id, u_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - record page - review
router.post("/record", (req, res) => {
  let reviewDate = req.body.date;
  let text = req.body.content;
  let vinylId = req.body.vin_id;
  let userId = req.body.us_id;
  let rating = req.body.rat;
  if (text) {
    console.log("adding review..");
    let addreview = `INSERT INTO review (review_id, review_date, content,rating, vinyl_id, user_id) VALUES (NULL, ?, ?, ?, ?, ?);`;
    let values = [reviewDate, text, rating, vinylId, userId];
    connection.query(addreview, values, (err, data, fields) => {
      if (err) {
        res.json({ err });
        throw err;
      }
      if (data) {
        let respObj = {
          id: data.insertId,
        };
        res.json({ respObj });
      }
    });
  }
});

// post - record page - like
router.post("/record/like", (req, res) => {
  let vinylId = req.body.vin_id;
  let userId = req.body.us_id;
  let likeF = req.body.like;
  if (likeF == 1) {
    let addlike = `INSERT INTO likes (likes_id, likes.like_status, vinyl_id, user_id) VALUES (NULL, ?, ?, ?);`;
    let values = [likeF, vinylId, userId];
    connection.query(addlike, values, (err, data, fields) => {
      if (err) {
        res.json({ err });
        throw err;
      }
      if (data) {
        let respObj = {
          id: data.insertId,
        };
        res.json({ respObj });
      }
    });
  } else {
    let checkdata = `SELECT * FROM likes WHERE vinyl_id = ? AND user_id = ?;`;
    let values = [vinylId, userId];
    connection.query(checkdata, values, (err, data) => {
      if (data.length > 0) {
        let deletedata = `DELETE FROM likes WHERE vinyl_id = ? AND user_id = ?;`;
        let value = [vinylId, userId];
        connection.query(deletedata, value, (err, data, fields) => {
          if (err) {
            res.json({ err });
            throw err;
          }
          if (data) {
            let respObj = {
              id: data.insertId,
            };
            res.json({ respObj });
          } else {
            let respObj = {};
            res.json({ respObj });
          }
        });
      }
    });
  }
});

module.exports = router;
