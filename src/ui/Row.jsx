import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  width: 100%;

  ${({ $type = "vertical" }) =>
    $type === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;

export default Row;
