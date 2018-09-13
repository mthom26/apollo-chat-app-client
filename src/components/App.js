import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import './App.css';

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

const App = () => {
  return (
    <div className="app">
      <h1>Chat App</h1>
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
    </div>
  );
}

export default App;
