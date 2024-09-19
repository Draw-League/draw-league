const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "drawing" ORDER BY created_at DESC;';
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error fetching drawings:`, err);
      res.sendStatus(500);
    });
});

router.post('/', async (req, res) => {
  try {
    const { team_id, event_id, drawing_url } = req.body;
    console.log('Received data:', req.body);

    const queryText = `
      INSERT INTO "drawing" (team_id, drawing_url, favorite_drawing, score, round, created_at, event_id)
      VALUES ($1, $2, false, 0, 1, NOW(), $3) RETURNING *;
    `;
    const queryParams = [team_id, drawing_url, event_id];

    const result = await pool.query(queryText, queryParams);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error during drawing insert:', err.message, err.stack);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
