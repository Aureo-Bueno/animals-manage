import { type JSX } from "react";
import type { AnimalFormProps } from "./types";
import * as S from "./styles";
import { useSpecies } from "../../hooks/use-species";

function AnimalForm({
  form,
  editId,
  addingSpecies,
  newSpecies,
  onChange,
  onSubmit,
  onAddSpeciesClick,
  onAddSpecies,
  onCancelAddSpecies,
  onNewSpeciesChange,
}: AnimalFormProps): JSX.Element {
  const { species } = useSpecies();

  return (
    <S.Form onSubmit={onSubmit}>
      <S.FormHeader>
        <div>
          <S.FormTitle>
            {editId !== null ? "Edit animal" : "Add animal"}
          </S.FormTitle>
          <S.FormHint>
            Keep names and species consistent for clean records.
          </S.FormHint>
        </div>
        {editId !== null && <S.Pill>Editing</S.Pill>}
      </S.FormHeader>
      <S.Field>
        <S.Label htmlFor="name">Animal Name</S.Label>
        <S.Input
          id="name"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
      </S.Field>
      <S.Field>
        <S.Label htmlFor="species">Species</S.Label>
        <S.Inline>
          <S.Select
            id="species"
            name="species"
            value={form.species}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              Select species
            </option>
            {species.map((sp) => (
              <option key={sp} value={sp}>
                {sp}
              </option>
            ))}
          </S.Select>
          {!addingSpecies && (
            <S.Button
              type="button"
              $variant="ghost"
              onClick={onAddSpeciesClick}
            >
              + Add species
            </S.Button>
          )}
        </S.Inline>
        {addingSpecies && (
          <S.Inline>
            <S.Input
              type="text"
              placeholder="New species"
              value={newSpecies}
              onChange={onNewSpeciesChange}
            />
            <S.Button type="button" $variant="accent" onClick={onAddSpecies}>
              Add
            </S.Button>
            <S.Button
              type="button"
              $variant="ghost"
              onClick={onCancelAddSpecies}
            >
              Cancel
            </S.Button>
          </S.Inline>
        )}
      </S.Field>
      <S.Actions>
        <S.Button type="submit" $variant="primary">
          {editId !== null ? "Update" : "Add"}
        </S.Button>
      </S.Actions>
    </S.Form>
  );
}
export default AnimalForm;
