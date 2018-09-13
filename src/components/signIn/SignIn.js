import React from 'react';

import CustomForm from '../utils/CustomForm';

const SignIn = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <CustomForm
        onSubmitAction={(data) => console.log(data)}
        formComponents={{
          username: true,
          password: true
        }}
      />
    </div>
  );
};

export default SignIn;
