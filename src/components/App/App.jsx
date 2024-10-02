import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Cloudinary } from "@cloudinary/url-gen";
import Contact from '../Contact/Contact';
import UserPage from '../UserPage/UserPage';
import EditEvent from '../EditEvent/EditEvent';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Rules from '../Rules/Rules';
import Join from '../Join/Join';
import Drawing from '../Drawing/Drawing';
import RefDash from '../RefDash/RefDash';
import AdminDash from '../AdminDash/AdminDash';
import AddEvent from '../AddEvent/AddEvent';
import ProRules from '../ProRules/ProRules';
import ProRef from '../ProRef/ProRef';
import ProJudge from '../ProJudge/ProJudge';
import ProDash from '../ProDash/ProDash';
import ProWinners_1 from '../ProWinners_1/ProWinners_1';
import ProWinners_2 from '../ProWinners_2/ProWinners_2';
import ProWinners_3 from '../ProWinners_3/ProWinners_3';
import ProBest from '../ProBest/ProBest';
import ProLeaderboard from '../ProLeaderboard/ProLeaderboard';
import JudgeGallery from '../JudgeGallery/JudgeGallery';
import JudgeScore from '../JudgeScore/JudgeScore';
import ProThemeblk from '../ProGameSlides/ProThemeblk';
import ProThemeRev from '../ProGameSlides/ProThemeRev';
import ProPrompt1Rev from '../ProGameSlides/ProPrompt1Rev';
import ProPrompt2blk from '../ProGameSlides/ProPrompt2blk';
import ProPrompt2Rev from '../ProGameSlides/ProPrompt2Rev';
import ProPrompt3blk from '../ProGameSlides/ProPrompt3blk';
import ProPrompt3Rev from '../ProGameSlides/ProPrompt3Rev';
import ProContactUs from '../ProContactUs/ProContactUs';
import JudgeJoin from '../JudgeJoin/JudgeJoin';

import './App.css';
import { io } from "socket.io-client";

function App() {
  const currentGame = useSelector((store) => store.currentGame)
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    initializeSockets();
  }, [dispatch]);

  const initializeSockets = () => {
    if (!socket) {
      let appSocket = io();
      setSocket(appSocket);
      // client-side
      appSocket.on("connect", () => {
        console.log(socket.id);
      });

      appSocket.on("disconnect", () => {
        console.log(socket.id)
      });
    }
  }
  return (
    <Router>
      <div>

        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />


          <Route
            // Not protected, shows Contact at all times (logged in or not)
            exact
            path="/contact">
            <Contact />
          </Route>

          <Route
            // Not protected, shows rules at all times (logged in or not)
            exact
            path="/rules">
            <Rules />
          </Route>

          <Route
            // Not protected, shows Join at all times (logged in or not)
            exact
            path="/join-game">
            <Join />
          </Route>

          <Route
            // Not protected, shows Drawing at all times (logged in or not)
            exact
            path="/drawing">
            <Drawing />
          </Route>

          <Route
            // Not protected, shows JudgeGallery at all times (logged in or not)
            exact
            path="/judgejoin">
            <JudgeJoin />
          </Route>

          <Route
            // Not protected, shows JudgeGallery at all times (logged in or not)
            exact
            path="/judgegallery/:id">
            <JudgeGallery />
          </Route>

          <Route
            // Not protected, shows JudgeScore at all times (logged in or not)
            exact
            path="/judgescore/:drawingid">
            <JudgeScore />
          </Route>

          <Route
            // logged in shows RefDash else shows LoginPage
            exact
            path="/refdash"
            render={(props) => (<RefDash socket={socket} {...props} currentGame={currentGame} />)} />
          {/* </ProtectedRoute> */}

          <Route
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/admindash"
            render={(props) => (<AdminDash socket={socket} {...props} />)} />

          <Route
            // logged in shows AddEvent else shows LoginPage
            exact
            path="/addevent">
            <AddEvent />
          </Route>

          <Route
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/prorules"
            render={(props) => (<ProRules socket={socket} {...props} />)} />

          <Route
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/proref"
            render={(props) => (<ProRef socket={socket} {...props} />)} />

          <ProtectedRoute
            // logged in shows ProDash else shows LoginPage
            exact
            path="/prodash">
            <ProDash />
          </ProtectedRoute>

          <Route
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/projudge"
            render={(props) => (<ProJudge socket={socket} {...props} currentGame={currentGame} />)} />

          <Route
            // logged in shows ProWinners else shows LoginPage
            exact
            path="/prowinners_1"
            render={(props) => (<ProWinners_1 socket={socket} {...props} currentGame={currentGame} />)} />
          
          {/* route above needs to be a ProtectedRoute */}

          <Route
            // logged in shows ProWinners else shows LoginPage
            exact
            path="/prowinners_2"
            render={(props) => (<ProWinners_2 socket={socket} {...props} currentGame={currentGame} />)} />
          
          {/* route above needs to be a ProtectedRoute */}

          <Route
            // logged in shows ProWinners else shows LoginPage
            exact
            path="/prowinners_3"
            render={(props) => (<ProWinners_3 socket={socket} {...props} currentGame={currentGame} />)} />
         
          {/* route above needs to be a ProtectedRoute */}

          <Route
            // logged in shows ProBest else shows LoginPage
            exact
            path="/probest"
            render={(props) => (<ProBest socket={socket} {...props} />)} />

          <Route
            // logged in shows ProLeaderboard else shows LoginPage
            exact
            path="/proleaderboard"
            render={(props) => (<ProLeaderboard socket={socket} {...props} />)} />

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/edit-event"
          >
            <EditEvent />
          </ProtectedRoute>

          <Route
            exact
            path="/ProThemeblk"
            render={(props) => (<ProThemeblk socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProThemeRev"
            render={(props) => (<ProThemeRev socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProPrompt1Rev"
            render={(props) => (<ProPrompt1Rev socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProPrompt2blk"
            render={(props) => (<ProPrompt2blk socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProPrompt2Rev"
            render={(props) => (<ProPrompt2Rev socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProPrompt3blk"
            render={(props) => (<ProPrompt3blk socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProPrompt3Rev"
            render={(props) => (<ProPrompt3Rev socket={socket} {...props} />)} />

          <Route
            exact
            path="/ProContactUs"
            render={(props) => (<ProContactUs socket={socket} {...props} />)} />

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/admindash" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/admindash" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/admindash" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
