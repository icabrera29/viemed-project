import React from 'react';
import {Routes, Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Auth from './screens/Auth';
import User from './screens/User';
import Login from './components/Login';
import Tasks from './components/Tasks';
import './App.css';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Auth>
              <Login />
            </Auth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <User>
                <Tasks />
              </User>
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
