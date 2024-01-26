const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - add a new collection
router.get("/addcollection/:userid", (req, res) => {
  let u_id = req.params.userid;
  let readsql = `SELECT * FROM collection WHERE user_id = ?; SELECT * FROM genres; SELECT * FROM artist;`;
  const values = [u_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - add a new collection
router.post("/addcollection/:userid", (req, res) => {
  let u_id = req.body.userid;
  let collection_id = req.body.selectedcollection;
  let genres_id = req.body.selectedgenres;
  let album_name = req.body.enteredtitle;
  let artist_id = req.body.selectartist;
  let new_artist = req.body.artistnew;
  let artist_img = req.body.imgartist;
  let describtion = req.body.des;
  let release_year = req.body.re_year;
  let vinyl_img = req.body.img;
  let tracks_list = JSON.parse(req.body.trackslist);
  if (new_artist) {
    let createsql = `INSERT INTO artist (atrist_id,artist_name, artist_img_url) VALUES (NULL,?,?);`;
    const values = [new_artist, artist_img];
    connection.query(createsql, values, (err, data, fields) => {
      if (err) {
        res.json({ err });
        throw err;
      } else {
        // get the artist_id of the newly created artist
        artist_id = data.insertId;
        // execute the update query
        executeUpdateQuery(artist_id);
      }
    });
  } else {
    executeUpdateQuery(artist_id);
  }
  function executeUpdateQuery(artist_id) {
    let createsql = `INSERT INTO vinyl (vinyl_id, album_name, describtion, release_year, img_url, artist_id, genres_id, collection_id) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [
      album_name,
      describtion,
      release_year,
      vinyl_img,
      artist_id,
      genres_id,
      collection_id,
    ];
    // execute insert query and wait for the result
    const insertVinylPromise = new Promise((resolve, reject) => {
      connection.query(createsql, values, (err, data, fields) => {
        if (err) {
          reject(err);
          throw err;
        } else {
          resolve(data);
        }
      });
    });
    insertVinylPromise.then((data) => {
      let vinylid = data.insertId;
      //add track
      let promises = [];
      for (let i = 0; i < tracks_list.length; i++) {
        const trackName = tracks_list[i];
        let tracklist = `INSERT INTO tracks (tracks_id, track_name, vinyl_id) VALUES (NULL, ?, ?);`;
        const values = [trackName, vinylid];
        let promise = new Promise((resolve, reject) => {
          connection.query(tracklist, values, (err, data, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
        promises.push(promise);
      }
      Promise.all(promises)
        .then((results) => {
          let respObj = {
            id: vinylid,
          };
          res.json({ respObj });
        })
        .catch((err) => {
          throw err;
        });
    });
  }
});

module.exports = router;
