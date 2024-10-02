const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/submissions/:id', (req, res) => {
  const eventId = req.params.id
  console.log('req params', req.params)
  const queryText = `
    SELECT drawing.id, drawing.drawing_url, drawing.score, drawing.round, drawing.favorite_drawing, team.team_name, team.event_id
    FROM drawing
    JOIN team ON drawing.team_id = team.id
    WHERE team.event_id = $1
    ORDER BY drawing.created_at DESC;
  `;
  pool.query(queryText, [eventId])
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.log(`Error fetching drawings:`, err);
      res.sendStatus(500);
    });
});

router.get('/top', (req, res) => {
  const queryText = `
    SELECT drawing.id, drawing.drawing_url, drawing.score, drawing.round, drawing.favorite_drawing, team.team_name, team.event_id
    FROM drawing
    JOIN team ON drawing.team_id = team.id
    ORDER BY drawing.score DESC;
  `;
  pool.query(queryText)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.log(`Error fetching drawings:`, err);
      res.sendStatus(500);
    });
});

router.post('/', async (req, res) => {
  try {
    const { team_id, drawing_url, event_id } = req.body;
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

router.put('/:id/score', async (req, res) => {
  const drawingId = req.params.id;
  const { score } = req.body;

  const queryText = `
    UPDATE "drawing"
    SET score = $1
    WHERE id = $2
    RETURNING *;
  `;

  try {
    const result = await pool.query(queryText, [score, drawingId]);
    if (result.rowCount === 0) {
      return res.status(404).send('Drawing not found');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating drawing score:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id/favorite', async (req, res) => {
  const drawingId = req.params.id;
  const { favorite } = req.body;

  const queryText = `
    UPDATE "drawing"
    SET favorite_drawing = $1
    WHERE id = $2
    RETURNING *;
  `;

  try {
    const result = await pool.query(queryText, [favorite, drawingId]);
    if (result.rowCount === 0) {
      return res.status(404).send('Drawing not found');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating favorite status:', err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
