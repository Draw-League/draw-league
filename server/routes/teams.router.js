const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "team";`;
  
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`GET ERROR MESSAGE HERE:`, err);
      res.sendStatus(500);
    });
});

/**
 * POST route
 */
router.post('/verify-or-add-team', async (req, res) => {
  const { teamName, eventId } = req.body;
  
  try {
    const queryTextCheck = `SELECT * FROM "team" WHERE team_name = $1 AND event_id = $2`;
    const result = await pool.query(queryTextCheck, [teamName, eventId]);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, teamId: result.rows[0].id });
    } else {
      const queryTextAdd = `INSERT INTO "team" (team_name, event_id) VALUES ($1, $2) RETURNING id`;
      const insertResult = await pool.query(queryTextAdd, [teamName, eventId]);

      res.status(201).json({ success: true, teamId: insertResult.rows[0].id });
    }
  } catch (err) {
    console.error('Error verifying or adding team:', err);
    res.status(500).send('Server error');
  }
});

/**
 * POST route
 */
// router.post('/verify-or-add-judge', async (req, res) => {
//   const { judgeName, eventId, judgeJob, judgeLike, judgeKnow } = req.body;
  
//   try {
//     const queryTextCheck = `SELECT * FROM "event" WHERE id = $1`;
//     const result = await pool.query(queryTextCheck, [ eventId]);

//     if (result.rows.length > 0) {
//       res.status(200).json({ success: true, teamId: result.rows[0].id });
//     } else {
//       const queryTextAdd = `INSERT INTO "event" (judge_name, judge_job, judge_like, judge_know) VALUES ($1, $2, $3, $4) RETURNING id`;
//       const insertResult = await pool.query(queryTextAdd, [judgeName, judgeJob, judgeLike, judgeKnow ]);
//       console.log(res.rows)
//       res.status(201).json({ success: true, teamId: insertResult.rows[0].id });
//     }
//   } catch (err) {
//     console.error('Error verifying or adding team:', err);
//     res.status(500).send('Server error');
//   }
// });

/**
 * PUT route template
 */
router.put('/:id', (req, res) => {
  const teamId = req.params.id;
  const { teamName } = req.body;

  const queryText = `UPDATE "team" SET team_name = $1 WHERE id = $2 RETURNING *;`;

  pool.query(queryText, [teamName, teamId])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log(`PUT ERROR MESSAGE HERE:`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
