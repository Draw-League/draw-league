const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


  /**
 * DELETE EVENT route template
 */
router.delete('/id', (req, res) => {
  console.log('req params',req.params);
  console.log('req body',req.body);
    const { id } = req.params;
    const sqlText = `
   DELETE FROM "event" WHERE id = $1;
    `;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log(`DELETED success`, result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error DELETE`, error);
            res.sendStatus(500); 
        })
  });

module.exports = router;