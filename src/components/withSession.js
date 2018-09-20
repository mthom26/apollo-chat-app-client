import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  {
    authUser {
      id
      username
      email
    }
  }
`;

const withSession = Component => props => {
  return (
    <Query query={GET_CURRENT_USER}>
      {({ error, loading, data, refetch }) => {
        if(loading) return null;

        return <Component {...props} refetch={refetch} currentUser={data} />
      }}
    </Query>
  )
};

export default withSession;