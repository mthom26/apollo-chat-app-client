import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav">
      <h2>Nav</h2>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  )
};

export default Nav;