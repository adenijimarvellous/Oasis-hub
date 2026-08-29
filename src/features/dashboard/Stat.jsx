import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.4rem;

  min-width: 0;
  min-height: 10rem;

  & > * {
    min-width: 0;
  }

  @media (max-width: 75em) {
    padding: 1.2rem;
    column-gap: 0.8rem;
  }

  @media (max-width: 36em) {
    padding: 1rem;
    column-gap: 0.7rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  width: clamp(3.5rem, 6.5vw, 5.5rem);
  aspect-ratio: 1;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: clamp(2rem, 4vw, 3rem);
    height: clamp(2rem, 4vw, 3rem);
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: clamp(0.8rem, 1vw, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 500;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: clamp(1.4rem, 2vw, 2rem);
  line-height: 1.2;
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
