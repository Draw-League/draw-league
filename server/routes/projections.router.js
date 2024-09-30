const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET Refs-intro
 */
router.get('/ref-intro/:id', (req, res) => {
    const eventId = req.params.id;
    console.log('GET all REF reqparams.id:', req.params.id);
    const queryText = `
    SELECT art_medium, ref_img, full_name, ref_job, ref_fact, judge_name, judge_job, judge_like, judge_know, judge_img 
FROM "user"
JOIN user_event ON user_event.user_id = "user".id
JOIN event ON user_event.event_id = event.id 
WHERE event.id = $1;
    `
    pool.query(queryText, [eventId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error GETting ref-intro data:`, err);
            res.sendStatus(500)
        })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;