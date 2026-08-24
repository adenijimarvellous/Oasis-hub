import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 64em) {
    flex-direction: row;
    gap: 0.4rem;
    overflow-x: auto;
    padding-bottom: 0.2rem;

    & > li {
      display: flex;
      flex: 0 0 auto;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    border-radius: var(--border-radius-sm);
    white-space: nowrap;

    @media (max-width: 64em) {
      padding: 1rem 1.2rem;
      min-height: var(--control-height);
    }

    @media (max-width: 30em) {
      span {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          <span>Home</span>
        </StyledNavLink>

        <StyledNavLink to="/bookings">
          <HiOutlineCalendarDays />
          <span>Bookings</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/cabins">
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/users">
          <HiOutlineUsers />
          <span>User</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/settings">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
}

export default MainNav;
