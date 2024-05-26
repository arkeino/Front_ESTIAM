import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/auth-guard';
import Users from './views/Users';
import UserDetails from './views/UserDetails';
import Login from './views/Login';
import CreateUser from './views/CreateUser';
import Welcome from './views/Welcome';

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      <Route
        path="/create-user"
        element={
          <AuthGuard><CreateUser /></AuthGuard>
        }
      />
      <Route
        path="/users"
        element={
          <AuthGuard><Users /></AuthGuard>
        }
      />
      <Route
        path="/users/:id"
        element={
          <AuthGuard><UserDetails /></AuthGuard>
        }
      />
      <Route path="/" element={<Welcome />} />  // Updated for Welcome page
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/"
        element={<Navigate replace to="/create-user" />}
      />
    </ReactRoutes>
  );
};

export default Routes;
