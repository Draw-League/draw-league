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
const projectionsRouter = require('./routes/projections.router')

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRouter);
app.use('/api/judges', judgeRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/admins', adminRouter);
app.use('/api/events', eventRouter);
app.use('/api/drawings', drawingsRouter);
app.use('/api/projections', projectionsRouter)

const cors = require('cors');
app.use(cors())
const http = require('http');

const server = http.createServer(app);
const io = require("socket.io")(server, {});

//socket.io 
io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('getGameInfo', () => {
    console.log('getGameInfo');
    io.emit('sendGameInfo')
  });
  socket.on('sendingGameInfo', (currentGame) => {
    console.log('sendingGameInfo');
    console.log('currentGame', currentGame);
    io.emit('gameInfo', currentGame);
  })

  socket.on('navigate', (pageName, currentGame) => {
    console.log('navigate', pageName, currentGame)
    io.emit('navigate', pageName, currentGame);
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // For the syncing the clock between RefTimer and ProTimer
  socket.on('setTime', (timeRemaining) => {
    console.log('setTime socket event');
    socket.broadcast.emit('setTime', timeRemaining);
  });


});



// Listen Server & Port
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
