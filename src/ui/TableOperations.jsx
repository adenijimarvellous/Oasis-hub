import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 48em) {
    justify-content: flex-start;
    width: 100%;
  }
`;

export default TableOperations;
