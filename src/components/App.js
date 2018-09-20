import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.css';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import Profile from './profile/Profile';
import withSession from './withSession';

const GET_USERS = gql`
  {
    users {
      id
      username
      email
      messages {
        content
      }
    }
  }
`;

const Users = () => (
  <Query query={GET_USERS}>
    {({ loading, error, data }) => {
      if(loading) return <p>Loading...</p>
      if(error) return <p>Error {`${error.message}`}</p>

      return (
        <div className="users">
          {data.users.map(user => (
            <div key={user.id} className="user">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )
    }}
  </Query>
);

const App = ({ currentUser, refetch }) => {
  console.log(currentUser);
  return (
    <div className="app">
      <h1>Chat App</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
          <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
          <Route path="/profile" render={() => <Profile />} />
          <Redirect to="/" />
        </Switch>
      </Router>
      
    </div>
  );
};

export default withSession(App);
