import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { GET_USER_INFO } from '../../queries';

const Profile = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <Fragment>
      <h1>Profile page</h1>
      <Query query={GET_USER_INFO}>
        {({ data, client }) => {
          console.log(data);
          return (
            <div>
              <h3>{data.userInfo.username}</h3>
            </div>
          );
        }}
      </Query>
    </Fragment>
  )
};

export default Profile;