const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/all-refs', (req, res) => {
  const queryText = `
                      SELECT *
                      FROM "user" 
                    `;

pool.query(queryText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log(`Error fetching submissions:`, err);
    res.sendStatus(500);
  });

})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const userRole = req.body.userRole;
  const refJob = req.body.refJob; 
  const refFact = req.body.refFact;
  const refImg = req.body.refImg;
  const fullName = req.body.fullName;
  const artMedium = req.body.artMedium; 
  const phoneNum = req.body.phoneNum;
  
  console.log('Received refImg:', refImg);

  const queryText = `INSERT INTO "user" ( username, password, user_role, ref_job, ref_fact, ref_img, full_name, art_medium, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING id`;
  pool
    .query(queryText, [username, password, userRole, refJob, refFact, refImg, fullName, artMedium, phoneNum])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
