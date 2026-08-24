import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  min-width: 0;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: var(--page-padding-block) var(--page-padding-inline) 6.4rem;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  min-width: 0;
`;

const Container = styled.div`
  max-width: var(--content-max-width);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-width: 0;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
