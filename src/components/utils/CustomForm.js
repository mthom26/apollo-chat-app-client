/*---------------------------------------------------------/
    UserForm is dynamic, displaying inputs conditionally
    depending on the formComponents prop. It's values are
    passed to the props.onSubmit function as an object. The
    onSubmit function then can choose whatever values it
    needs from the object.
/---------------------------------------------------------*/

import React from 'react';

const initialState = {
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  },
  error: null
};

class CustomForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };

  }

  onSubmit = (event) => {
    event.preventDefault();
    const { data } = this.state;
    this.setState({ ...initialState });
    this.props.onSubmitAction(data);
  }

  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm
    } = this.state.data;
    // const { error } = this.state;
    const { formComponents } = this.props;

    return (
      <div>
        <form>
          {formComponents.username &&
            <input
              value={username}
              name="username"
              placeholder="User Name"
              type="text"
              onChange={this.onChange}
            />}

          {formComponents.email &&
          <input
            value={email}
            name="email"
            placeholder="Email Address"
            type="text"
            onChange={this.onChange}
          />}

          {formComponents.password &&
          <input
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.onChange}
          />}

          {formComponents.passwordConfirm &&
          <input
            value={passwordConfirm}
            name="passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            onChange={this.onChange}
          />}

          <button
            onClick={this.onSubmit}
          >
            Submit
          </button>

        </form>
      </div>
    );
  }
}

export default CustomForm;