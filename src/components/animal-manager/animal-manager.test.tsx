import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimalManager } from "./index";
import { renderWithTheme } from "../../test/test-utils";
import { resetStores } from "../../test/reset-stores";

describe("AnimalManager", () => {
  beforeEach(() => {
    resetStores();
  });

  it("adds a new animal via the form", async () => {
    const user = userEvent.setup();

    renderWithTheme(<AnimalManager />);

    await user.type(screen.getByLabelText(/animal name/i), "Bolt");
    await user.selectOptions(screen.getByLabelText(/species/i), "Dog");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getByText("Bolt")).toBeInTheDocument();
    expect(screen.getAllByText("3")).toHaveLength(2);
  });

  it("edits and deletes animals", async () => {
    const user = userEvent.setup();

    renderWithTheme(<AnimalManager />);

    const rexItem = screen.getByText("Rex").closest("li");
    expect(rexItem).not.toBeNull();

    await user.click(within(rexItem as HTMLElement).getByRole("button", { name: /edit/i }));

    expect(screen.getByText(/editing/i)).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/animal name/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Max");
    await user.selectOptions(screen.getByLabelText(/species/i), "Cat");
    await user.click(screen.getByRole("button", { name: /update/i }));

    expect(screen.queryByText("Rex")).not.toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();

    const mimiItem = screen.getByText("Mimi").closest("li");
    expect(mimiItem).not.toBeNull();

    await user.click(
      within(mimiItem as HTMLElement).getByRole("button", { name: /delete/i })
    );

    expect(screen.queryByText("Mimi")).not.toBeInTheDocument();
  });

  it("adds a new species and uses it", async () => {
    const user = userEvent.setup();

    renderWithTheme(<AnimalManager />);

    await user.click(screen.getByRole("button", { name: /add species/i }));

    const newSpeciesInput = screen.getByPlaceholderText(/new species/i);
    await user.type(newSpeciesInput, "Bird");

    const inlineActions = newSpeciesInput.parentElement;
    expect(inlineActions).not.toBeNull();

    await user.click(
      within(inlineActions as HTMLElement).getByRole("button", { name: /^add$/i })
    );

    const speciesSelect = screen.getByLabelText(/species/i) as HTMLSelectElement;
    expect(screen.getByRole("option", { name: "Bird" })).toBeInTheDocument();
    expect(speciesSelect.value).toBe("Bird");

    await user.type(screen.getByLabelText(/animal name/i), "Sky");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    const skyItem = screen.getByText("Sky").closest("li");
    expect(skyItem).not.toBeNull();
    expect(within(skyItem as HTMLElement).getByText("Bird")).toBeInTheDocument();
  });
});
