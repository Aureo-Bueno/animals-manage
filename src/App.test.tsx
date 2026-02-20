import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders the animal manager title", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /animal management/i }),
    ).toBeInTheDocument();
  });
});
