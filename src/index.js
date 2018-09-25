import React from 'react';
import ReactDOM from 'react-dom';
//import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

const cache = new InMemoryCache({
  // cacheRedirects: {
  //   Query: {
  //     movie: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: 'Movie', id })
  //   }
  // }
});

const request = async (operation) => {
  const token = localStorage.getItem('Token');
    console.log(token);
    if(token) {
      
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
       // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        console.log(`Network Error: ${networkError}`);

        if(networkError.statusCode === 401) {
          localStorage.removeItem('Token');
        }
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        userInfo: {
          __typename: 'UserInfo',
          id: 'testID',
          username: 'Test Username',
          email: 'test@mail.com',
          messages: []
        }
      },
      // resolvers: {
      //   Mutation: {
      //     updateNetworkStatus: (_, { isConnected }, { cache }) => {
      //       cache.writeData({ data: { isConnected }});
      //       return null;
      //     }
      //   }
      // },
      cache
    }),
    new HttpLink({
      uri: 'http://localhost:8000/graphql',
      // credentials: 'include'
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

