import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const StyledLink = styled(NavLink)`
width: 100px;
font-size: 20px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  &.active {
    background-color: lightblue;
     border-radius: 3px;
     color: white;
  }
`;

export const Container = styled.div`
   max-width: 1280px;
    padding-left: 15px;
    padding-right: 15px;
    margin: o auto;
    margin: 0 auto;
`;

export const List = styled.ul`
  display: flex;
  gap: 20px;
`;

export const NavItem = styled.li`
  font-size: 32px;
`;

export const Header = styled.header`
  padding: 20px 0;
  margin-bottom: 20px;

  box-shadow: 5px 8px 5px -9px rgba(0, 0, 0, 0.75);
`;