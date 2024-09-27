const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET
 */
router.get('/submissions', (req, res) => {
  const queryText = `
    SELECT drawing.id, drawing.drawing_url, drawing.favorite_drawing, drawing.score, drawing.round, drawing.created_at, 
           team.team_name
    FROM drawing
    JOIN team ON drawing.team_id = team.id
    ORDER BY drawing.created_at DESC;
  `;

  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error fetching submissions:`, err);
      res.sendStatus(500);
    });
});

/**
 * POST
 */
router.post('/', (req, res) => {
  const { team_id, drawing_url, round } = req.body;

  const queryText = `
    INSERT INTO "drawing" (team_id, drawing_url, favorite_drawing, score, round, created_at)
    VALUES ($1, $2, false, 50, $3, NOW()) RETURNING *;
  `;

  pool.query(queryText, [team_id, drawing_url, round])
    .then(result => res.status(201).json(result.rows[0]))
    .catch((err) => {
      console.log('Error adding new submission: ', err);
      res.sendStatus(500);
    });
});

/**
 * PUT
 */
router.put('/:id', (req, res) => {
  const drawingId = req.params.id;
  const { favorite_drawing, score } = req.body;

  const queryText = `
    UPDATE "drawing"
    SET favorite_drawing = $1, score = $2
    WHERE id = $3 RETURNING *;
  `;

  pool.query(queryText, [favorite_drawing, score, drawingId])
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).send('Drawing not found');
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => {
      console.log(`Error updating drawing:`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
