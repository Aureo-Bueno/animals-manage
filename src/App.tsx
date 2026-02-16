import { ThemeProvider } from "styled-components";
import AnimalManager from "./components/animal-manager";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimalManager />
    </ThemeProvider>
  );
}

export default App;
