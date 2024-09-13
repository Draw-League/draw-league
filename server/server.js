const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const teamsRouter = require('./routes/teams.router');
const eventRouter = require('./routes/event.router');

// Route Includes
const userRouter = require('./routes/user.router');
const judgeRouter = require('./routes/judge.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/judge', judgeRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/judge', eventRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
