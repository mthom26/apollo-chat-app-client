import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  return (
    <NavContainer>
      <h2>Nav</h2>
      <NavLink to="/">
        <NavButton>Home</NavButton>
      </NavLink>
      <NavLink to="/signin">
        <NavButton>Sign In</NavButton>
      </NavLink>
      <NavLink to="/signup">
        <NavButton>Sign Up</NavButton>
      </NavLink>
      <NavLink to="/profile">
        <NavButton>Profile</NavButton>
      </NavLink>
    </NavContainer>
  )
};

export default Nav;

/*---------*/
/* Styling */
/*---------*/
const NavContainer = styled.div`
  min-width: 250px;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const NavButton = styled.div`
  padding: 0.8rem 0;

  &:hover {
    background: rgba(0,0,0,0.5);
  }
`;