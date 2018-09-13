import React from 'react';

import CustomForm from '../utils/CustomForm';

const SignUp = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <CustomForm
        onSubmitAction={(data) => console.log(data)}
        formComponents={{
          username: true,
          email: true,
          password: true,
          passwordConfirm: true
        }}
      />
    </div>
  );
};

export default SignUp;