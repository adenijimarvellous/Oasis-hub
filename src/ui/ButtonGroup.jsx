import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 30em) {
    & > * {
      flex: 1 1 100%;
    }
  }
`;

export default ButtonGroup;
