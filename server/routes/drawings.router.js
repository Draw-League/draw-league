

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
   const queryText = `
      // querytext goes here
      `
    pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`GET ERROR MESSAGE HERE:`, err);
      res.sendStatus(500)
    })
    
  });
  
  /**
   * POST route template
   */
  router.post('/', (req, res) => {
    // POST route code here
    const queryText = `
    // querytext goes here
    `
    pool.query( queryText)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('POST ERROR MESSAGE HERE: ', err);
      res.sendStatus(500);
    });
  
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
      console.log(`PUT ERROR MESSAGE HERE:`, err);
      res.sendStatus(500)
    })
    });
    


module.exports = router;