
const axios = require('axios')
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM drawings ORDER BY created_at DESC;';
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error fetching drawings:`, err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const { teamName, gameCode, imageUrl } = req.body;

  const queryText = `
    INSERT INTO drawings (team_name, game_code, image_url, created_at)
    VALUES ($1, $2, $3, NOW()) RETURNING *;
  `;
  pool.query(queryText, [teamName, gameCode, imageUrl])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error saving drawing:', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { imageUrl } = req.body;
  const queryText = 'UPDATE drawings SET image_url = $1 WHERE id = $2;';
  pool.query(queryText, [imageUrl, req.params.id])
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(`Error updating drawing:`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
