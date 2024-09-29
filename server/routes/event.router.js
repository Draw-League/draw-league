const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { theme } = require('@cloudinary/url-gen/actions/effect');
const router = express.Router();


const codeGenerator = () => {

  let codeLength = 4;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
  let codes = {
    eventCode: '',
    judgeCode: ''
  };

  const charactersLength = characters.length;

  for (let i = 0; i < codeLength; i++) {
    const eventIndex = Math.floor(Math.random() * charactersLength);
    const judgeIndex = Math.floor(Math.random() * charactersLength);
    {
      codes.eventCode += characters[eventIndex];
      codes.judgeCode += characters[judgeIndex];
    }
  }

  return codes;

}

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  const eventId = req.params.id;
  const queryText = `
  SELECT * FROM event 
JOIN user_event ON event.id = user_event.event_id
JOIN "user" ON "user".id = user_event.user_id
WHERE event.id = $1;
  `



  // `                       SELECT *
  //                       FROM event
  //                       WHERE id = ${eventId};`;
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`EVENT GET ERROR MESSAGE HERE:`, err);
      res.sendStatus(500)
    })

});


// GET route for admin dash
router.get('/', (req, res) =>{
  const queryText = `
  SELECT event.id, location_name, location_address, event_date, event_code, judge_name, judge_code, full_name
  FROM event
  JOIN user_event ON event.id = user_event.event_id
  JOIN "user" ON "user".id = user_event.user_id
  `
  pool.query(queryText)
    .then(result => {
      console.log('Event GET for admin dash', result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`EVENT GET ERROR MESSAGE HERE:`, err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */

//Make sure to use rejectUnauthenticated once front end reducer and axios call are posting to the route.
router.post('/create-event', rejectUnauthenticated, async (req, res) => {
  // POST route code here
  //codeGenerator();
  console.log('code generator', codeGenerator().judgeCode);
  const connection = await pool.connect();
  try {
    const eventCreate = {
      theme: req.body.theme,
      promptOne: req.body.promptOne,
      promptTwo: req.body.promptTwo,
      promptThree: req.body.promptThree,
      eventDate: req.body.eventDate,
      eventCode: codeGenerator().eventCode,
      locationName: req.body.locationName,
      locationAddress: req.body.locationAddress,
      judgeName: req.body.judgeName,
      judgeJob: req.body.judgeJob,
      judgeLike: req.body.judgeLike,
      judgeKnow: req.body.judgeKnow,
      judgeImg: req.body.judgeImg,
      judgeCode: codeGenerator().judgeCode,
      createdBy: req.user.id,
      refId: req.body.refId
    }
    const queryTextEvent = `
                        INSERT INTO event (theme, prompt_one, prompt_two, 
                        prompt_three, event_date, event_code, location_name, location_address,
                        judge_name, judge_job, judge_like, judge_know, judge_img, judge_code, created_by)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id
                      `;
    await connection.query('BEGIN;');
    const result = await connection.query(queryTextEvent, [eventCreate.theme,
    eventCreate.promptOne,
    eventCreate.promptTwo,
    eventCreate.promptThree,
    eventCreate.eventDate,
    eventCreate.eventCode,
    eventCreate.locationName,
    eventCreate.locationAddress,
    eventCreate.judgeName,
    eventCreate.judgeJob,
    eventCreate.judgeLike,
    eventCreate.judgeKnow,
    eventCreate.judgeImg,
    eventCreate.judgeCode,
    eventCreate.createdBy
    ])
    const eventId = result.rows[0].id;
    const refId = eventCreate.refId;
    const queryTextEventId = `
                              INSERT INTO user_event (user_id, event_id)
                              VALUES($1, $2)
                              ;`;
    await connection.query(queryTextEventId, [refId, eventId]);
    await connection.query('COMMIT;');
    res.sendStatus(201);
  }
  catch (error) {
    await connection.query('ROLLBACK;');
    console.error(`Transaction error posting to event: `, error);
    res.sendStatus(500);
  }
  finally {
    await connection.release();
  }
});

/**
 * POST route to verify game code
 */
router.post('/verify-game-code', async (req, res) => {
  const { gameCode } = req.body;
  try {
    const queryText = `SELECT * FROM "event" WHERE event_code = $1`;
    const result = await pool.query(queryText, [gameCode]);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, eventId: result.rows[0].id });
    } else {
      res.status(400).json({ success: false, message: 'Invalid game code' });
    }
  } catch (err) {
    console.error('Error verifying game code:', err);
    res.status(500).send('Server error');
  }
});

/**
 * PUT route template
 */
router.put('/', (req, res) => {
  // PUT route code here
  const queryText = `
      // querytext goes here
      `
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`EVENT PUT ERROR MESSAGE HERE:`, err);
      res.sendStatus(500)
    })
});

/**
* DELETE route template
*/
router.delete('/:id', (req, res) => {
  // PUT route code here
  const id = req.params;
  const sqlText = `
      DELETE FROM events
      WHERE id=$1
      `;
  pool.query(sqlText, [id])
    .then((result) => {
      console.log(`DELETED success`, result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Event Error DELETE`, error);
      res.sendStatus(500);
    })
});
module.exports = router;