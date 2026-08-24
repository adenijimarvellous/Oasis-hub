import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;

  ${({ $type, type = "vertical" }) =>
    ($type || type) === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          gap: 1.6rem;
          flex-wrap: wrap;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;

export default Row;
