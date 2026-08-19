import { forwardRef, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding-right: 4rem;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  padding: 0;

  color: var(--color-grey-500);

  &:hover {
    color: var(--color-grey-700);
  }
`;

const PasswordInput = forwardRef(function PasswordInput({ ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      <StyledInput
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
      />

      <ToggleButton
        type="button"
        onClick={() => setShowPassword((show) => !show)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <HiEyeSlash /> : <HiEye />}
      </ToggleButton>
    </Wrapper>
  );
});

export default PasswordInput;
