import styled, { css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.type === "horizonal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      justify-content: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
export default Row;
