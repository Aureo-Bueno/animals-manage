import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => theme.colors.surface} 70%
    );
  }

  #root {
    min-height: 100vh;
  }

  input,
  select,
  button,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    background: none;
  }
`;
