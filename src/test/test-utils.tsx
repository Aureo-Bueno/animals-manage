import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export const renderWithTheme = (ui: ReactElement) =>
  render(ui, { wrapper: Wrapper });
