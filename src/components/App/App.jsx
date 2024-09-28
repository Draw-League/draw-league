import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
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
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Rules from '../Rules/Rules';
import Join from '../Join/Join';
import Drawing from '../Drawing/Drawing';
import TeamGallery from '../TeamGallery/TeamGallery';
import RefDash from '../RefDash/RefDash';
import AdminDash from '../AdminDash/AdminDash';
import AddEvent from '../AddEvent/AddEvent';
import AddRef from '../AddRef/AddRef';
import ProRules from '../ProRules/ProRules';
import ProRef from '../ProRef/ProRef';
import ProJudge from '../ProJudge/ProJudge';
import ProDash from '../ProDash/ProDash';
import ProWinners from '../ProWinners/ProWinners';
import ProBest from '../ProBest/ProBest';
import ProLeaderboard from '../ProLeaderboard/ProLeaderboard';
import JudgeGallery from '../JudgeGallery/JudgeGallery';
import JudgeScore from '../JudgeScore/JudgeScore';


import './App.css';
import { io } from "socket.io-client";

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
     initializeSockets();
  }, [dispatch]);

  const initializeSockets = () => {
    if(!socket) {
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
            path="/judgegallery">
            <JudgeGallery />
          </Route>

          <Route
            // Not protected, shows JudgeScore at all times (logged in or not)
            exact
            path="/judgescore/:drawingid">
            <JudgeScore />
          </Route>

          <Route
            exact
            path="/team-gallery">
            <TeamGallery />
          </Route>

          <Route
            // Not protected, shows TeamGallery at all times (logged in or not)
            exact
            path="/team-gallery">
            <TeamGallery />
          </Route>

          <Route
            // logged in shows RefDash else shows LoginPage
            exact
            path="/refdash"
            render={(props) => (<RefDash socket={socket} {...props} />)} />
          {/* </ProtectedRoute> */}

          <Route
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/admindash">
            <AdminDash />
          </Route>

          <Route
            // logged in shows AddEvent else shows LoginPage
            exact
            path="/addevent">
            <AddEvent />
          </Route>

          <Route
            // logged in shows AddRef else shows LoginPage
            exact
            path="/addref">
            <AddRef />
          </Route>

          <ProtectedRoute
            // logged in shows ProRules else shows LoginPage
            exact
            path="/prorules">
            <ProRules />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProRef else shows LoginPage
            exact
            path="/proref">
            <ProRef />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProDash else shows LoginPage
            exact
            path="/prodash">
            <ProDash />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProJudge else shows LoginPage
            exact
            path="/projudge">
            <ProJudge />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProWinners else shows LoginPage
            exact
            path="/prowinners">
            <ProWinners />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProBest else shows LoginPage
            exact
            path="/probest">
            <ProBest />
          </ProtectedRoute>

          <Route
            // logged in shows ProLeaderboard else shows LoginPage
            exact
            path="/proleaderboard"
            render={(props) => (<ProLeaderboard socket={socket} {...props} />)} />

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

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
              <Redirect to="/user" />
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
