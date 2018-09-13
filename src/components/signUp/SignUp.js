import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import CustomForm from '../utils/CustomForm';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) { 
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  onSignUp = (data, signUp) => {
    this.setState({
      ...data
    }, async () => {
      // Get Token from server
      const data = await signUp();
      console.log(data);
    })
  }

  render() {
    const { username, password, email } = this.state;

    return (
      <div>
        <h2>Sign Up</h2>
        <Mutation mutation={SIGN_UP} variables={{ username, password, email }}>
          {(signUp, { data, error, loading }) => {
            return (
              <Fragment>
                <CustomForm
                  mutationFunc={signUp}
                  onSubmitAction={this.onSignUp}
                  formComponents={{
                    username: true,
                    email: true,
                    password: true,
                    passwordConfirm: true
                  }}
                />
              </Fragment>
            )
          }}
        </Mutation>
        
      </div>
    );
  }
}

export default SignUp;