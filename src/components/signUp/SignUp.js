import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import CustomForm from '../utils/CustomForm';
import { SIGN_UP } from '../../queries';

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
      // TODO check for token before calling ,setItem()
      localStorage.setItem('Token', data.data.signUp.token);
      // Fetch currentUser before redirecting
      await this.props.refetch();
      this.props.history.push('/');
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

export default withRouter(SignUp);