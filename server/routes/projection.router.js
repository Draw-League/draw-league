const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET Refs-intro
 */
router.get('/ref-intro', (req, res) => {
    const queryText = `
   SELECT ref_img, full_name, ref_job, ref_fact, art_medium FROM "user"
    INNER JOIN user_event on user_event.user_id = "user".id;
    `
  pool.query(queryText)
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