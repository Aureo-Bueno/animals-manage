import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimalList } from "./index";
import { renderWithTheme } from "../../test/test-utils";
import { resetStores } from "../../test/reset-stores";
import { animalStore } from "../../store/animal/store";

describe("AnimalList", () => {
  beforeEach(() => {
    resetStores();
  });

  it("renders the empty state when there are no animals", () => {
    animalStore.setState(() => ({ animals: [], nextId: 1 }));

    renderWithTheme(<AnimalList onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(
      screen.getByText(/no animals added yet\./i)
    ).toBeInTheDocument();
  });

  it("calls edit and delete handlers", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(<AnimalList onEdit={onEdit} onDelete={onDelete} />);

    const rexItem = screen.getByText("Rex").closest("li");
    expect(rexItem).not.toBeNull();

    await user.click(within(rexItem as HTMLElement).getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Rex", species: "Dog" })
    );

    await user.click(
      within(rexItem as HTMLElement).getByRole("button", { name: /delete/i })
    );
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
