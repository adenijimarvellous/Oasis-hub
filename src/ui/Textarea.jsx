import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  min-width: 0;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  min-height: 8rem;
  resize: vertical;
`;

export default Textarea;
