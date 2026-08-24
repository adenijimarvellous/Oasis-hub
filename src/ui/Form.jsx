import styled, { css } from "styled-components";

const Form = styled.form`
  ${({ $type }) =>
    $type !== "regular" &&
    css`
      padding: clamp(2rem, 4vw, 2.4rem) clamp(1.6rem, 4vw, 4rem);

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${({ $type }) =>
    $type === "modal" &&
    css`
      width: min(80rem, calc(100vw - 3.2rem));
    `}

  overflow: visible;
  font-size: 1.4rem;
  max-width: 100%;
  min-width: 0;
`;

Form.defaultProps = {
  $type: "regular",
};

export default Form;
