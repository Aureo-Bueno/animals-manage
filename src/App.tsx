import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { AnimalManager } from "./components/animal-manager";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimalManager />
    </ThemeProvider>
  );
}
