import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 64em) {
    grid-row: 2;
    padding: 0.8rem var(--page-padding-inline);
    border-right: none;
    border-bottom: 1px solid var(--color-grey-100);
    gap: 1.2rem;

    & > :first-child {
      display: none;
    }
  }
`;

function SideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
export default SideBar;
