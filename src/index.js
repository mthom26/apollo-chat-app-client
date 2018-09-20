import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    const token = localStorage.getItem('Token');
    console.log(token);
    if(token) {
      
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  },
  onError: ({ networkError }) => {
    if(networkError) {
      console.log(`Network Error: ${networkError}`);

      if(networkError.statusCode === 401) {
        localStorage.removeItem('Token');
      }
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

