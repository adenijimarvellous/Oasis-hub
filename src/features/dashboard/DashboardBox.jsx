import styled from "styled-components";

// const DashboardBox = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);

//   padding: clamp(1.5rem, 2.5vw, 3rem);

//   display: flex;
//   flex-direction: column;
//   gap: clamp(1.6rem, 2vw, 2.4rem);
//   min-width: 0;
// `;

// export default DashboardBox;

const DashboardBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: clamp(1.6rem, 3vw, 3.2rem);

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  min-width: 0;

  @media (max-width: 36em) {
    padding: 1.6rem;
    gap: 1.6rem;
  }
`;
export default DashboardBox;
