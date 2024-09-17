const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { theme } = require('@cloudinary/url-gen/actions/effect');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    // GET route code here
    const eventId = req.params.id;
   const queryText = `
                        SELECT *
                        FROM event
                        WHERE id = ${eventId};
                      `;
    pool.query(queryText)
    .then(result => {
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
  router.post('/create-event', async (req, res) => {
    // POST route code here
    const connection = await pool.connect();
  try{
    const eventCreate = {
      theme: req.body.theme,
      promptOne: req.body.promptOne,
      promptTwo: req.body.promptTwo,
      promptThree: req.body.promptThree,
      eventDate: req.body.eventDate,
      eventCode: '1234', //will eventually be populated by serverside code generator function
      locationName: req.body.locationName,
      locationAddress: req.body.locationAddress,
      judgeName: req.body.judgeName,
      judgeJob: req.body.judgeJob,
      judgeLike: req.body.judgeLike,
      judgeKnow: req.body.judgeKnow,
      judgeImg: req.body.judgeImg,
      judgeCode: '4321', //will eventually be populated by serverside code generator function
      createdBy: 1  //will be from req.user.id but hardcoded for testing
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
    const queryTextEventId = `
                              INSERT INTO user_event (event_id)
                              VALUES($1)
                              ;`;
    await connection.query(queryTextEventId, [eventId]);
    await connection.query('COMMIT;');
    res.sendStatus(201);
    }
    catch(error){
      await connection.query('ROLLBACK;');
      console.error(`Transaction error posting to event: `, error);
      res.sendStatus(500);
  }
  finally {
    await connection.release();
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
      const { id } = req.params;
      const sqlText = `
      // queryText goes here
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