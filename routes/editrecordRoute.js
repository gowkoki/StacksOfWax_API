const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

// get - edit the record
router.get("/editrecord/:userid/:vinylid", (req, res) => {
  let u_id = req.params.userid;
  let v_id = req.params.vinylid;
  let readsql = `SELECT * FROM collection WHERE user_id = ?; SELECT * FROM genres; SELECT * FROM artist;SELECT * FROM vinyl WHERE vinyl.vinyl_id = ?;SELECT * FROM tracks WHERE tracks.vinyl_id =?;`;
  let values = [u_id, v_id, v_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

// post - edit the record
router.post("/editrecord/:userid/:vinylid", (req, res) => {
  let u_id = req.body.userid;
  let v_id = req.body.vinylid;
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
  let tracks_id = JSON.parse(req.body.t_id);

  //if artist id is exist
  if (new_artist) {
    let createsql = `INSERT INTO artist (atrist_id,artist_name, artist_img_url) VALUES (NULL,?,?);`;
    let values = [new_artist, artist_img];
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
    let createsql;
    let values = [];
    if (vinyl_img) {
      console.log(artist_id);
      createsql = `UPDATE vinyl SET album_name = ?, describtion = ?, release_year = ?,img_url = ?,artist_id = ?,genres_id =?,collection_id = ? WHERE vinyl.vinyl_id = ?;`;
      values = [
        album_name,
        describtion,
        release_year,
        vinyl_img,
        artist_id,
        genres_id,
        collection_id,
        v_id,
      ];
    } else {
      console.log(artist_id);
      createsql = `UPDATE vinyl SET album_name = '${album_name}', describtion = '${describtion}', release_year = ${release_year},artist_id = ${artist_id},genres_id =${genres_id},collection_id = ${collection_id} WHERE vinyl.vinyl_id = ${v_id};`;
      values = [
        album_name,
        describtion,
        release_year,
        artist_id,
        genres_id,
        collection_id,
        v_id,
      ];
    }
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
    insertVinylPromise
      .then((data) => {
        vinylid = data.insertId;
        //add track
        const promises = tracks_list.map((trackName, index) => {
          const trackid = tracks_id[index];
          if (trackid) {
            let tracklist = `UPDATE tracks SET track_name = ? WHERE tracks.tracks_id = ?`;
            let values = [trackName, trackid];
            return new Promise((resolve, reject) => {
              connection.query(tracklist, values, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          } else {
            let tracklist = `INSERT INTO tracks (tracks_id, track_name, vinyl_id) VALUES (NULL, ?,?);`;
            let values = [trackName, v_id];
            return new Promise((resolve, reject) => {
              connection.query(tracklist, values, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          }
        });
        Promise.all(promises)
          .then(() => {
            let respObj = {
              msg: "success",
            };
            res.json({ respObj });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
});

//delete - record
router.delete("/editrecord/:recordid", (req, res) => {
  let r_id = req.params.recordid;
  console.log(r_id);
  let readsql = `DELETE FROM vinyl WHERE vinyl.vinyl_id = ?;`;
  let values = [r_id];
  connection.query(readsql, values, (err, data) => {
    if (err) throw err;
    res.json({ data });
  });
});

module.exports = router;
