import gql from 'graphql-tag';

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

const SIGN_IN = gql`
  mutation($username: String!, $password: String!) { 
    signIn(username: $username, password: $password) {
      token
    }
  }
`;

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) { 
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const GET_USER_INFO = gql`
  {
    userInfo @client {
      username
      email
      id
    }
  }
`;

export {
  GET_USERS,
  SIGN_IN,
  SIGN_UP,
  GET_USER_INFO
};