import React, { Fragment } from 'react';

import withSession from '../withSession';

const Profile = ({ currentUser, refetch }) => {
  console.log(currentUser);
  return (
    <Fragment>
    <h1>Profile page</h1>
    <h2>{currentUser.username}</h2>
    <p>{currentUser.email}</p>
    </Fragment>
  )
};

export default withSession(Profile);