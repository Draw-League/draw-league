import React, { useEffect } from 'react';
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

import Contact from '../Contact/Contact';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Rules from '../Rules/Rules';
import Join from '../Join/Join';
import Drawing from '../Drawing/Drawing';
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


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
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
            // Not protected, shows Contact at all times (logged in or not)
            exact
            path="/rules">
            <Rules />
          </Route>

          <Route
            // Not protected, shows Contact at all times (logged in or not)
            exact
            path="/join">
            <Join />
          </Route>

          <Route
            // Not protected, shows Contact at all times (logged in or not)
            exact
            path="/drawing">
            <Drawing />
          </Route>

          <ProtectedRoute
            // logged in shows RefDash else shows LoginPage
            exact
            path="/refdash">
            <RefDash />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminDash else shows LoginPage
            exact
            path="/admindash">
            <AdminDash />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddEvent else shows LoginPage
            exact
            path="/addevent">
            <AddEvent />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddRef else shows LoginPage
            exact
            path="/addref">
            <AddRef />
          </ProtectedRoute>

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
            // logged in shows ProJudge else shows LoginPage
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
            // logged in shows ProJudge else shows LoginPage
            exact
            path="/prowinners">
            <ProWinners />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProJudge else shows LoginPage
            exact
            path="/probest">
            <ProBest />
          </ProtectedRoute>

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
              <Redirect to="/user" />
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

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
