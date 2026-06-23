import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const Button = styled.button`
    background: yellow;
    padding: 8px 16px;
    border-radius: 4px;
  `;
  return (
    <>
      <GlobalStyle />
      <div>
        <Button>Hello Hub</Button>
      </div>
    </>
  );
}

export default App;
