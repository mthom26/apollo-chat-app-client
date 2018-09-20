import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import CustomForm from '../utils/CustomForm';
import { SIGN_IN } from '../../queries';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onSignIn = (data, signIn) => {
    this.setState({
      ...data
    }, async () => {
      // Get Token from server
      const data = await signIn();
      console.log(data);
      // TODO check for token before calling ,setItem()
      localStorage.setItem('Token', data.data.signIn.token);
      // Fetch currentUser before redirecting
      await this.props.refetch();
      this.props.history.push('/');
    })
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Sign In</h2>
        <Mutation mutation={SIGN_IN} variables={{ username, password }}>
          {(signIn, { data, error, loading }) => {
            return (
              <Fragment>
                <CustomForm
                  mutationFunc={signIn}
                  onSubmitAction={this.onSignIn}
                  formComponents={{
                    username: true,
                    password: true
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

export default withRouter(SignIn);
