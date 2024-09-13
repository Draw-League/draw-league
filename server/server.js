const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');


// Route Includes
const userRouter = require('./routes/user.router');
const judgeRouter = require('./routes/judge.router');
const teamsRouter = require('./routes/teams.router');
const eventRouter = require('./routes/event.router');
const adminRouter = require('./routes/admin.router');
const drawingsRouter = require('./routes/drawings.router');

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
app.use('/api/admin', adminRouter);
app.use('/api/event', eventRouter);
app.use('/api/drawings', drawingsRouter);





// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
