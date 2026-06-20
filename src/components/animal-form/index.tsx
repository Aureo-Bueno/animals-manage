import { useState, type JSX } from "react";
import type { AnimalFormProps } from "./types";
import * as S from "./styles";
import { useSpecies } from "../../hooks/use-species";

export function AnimalForm({
  form,
  editId,
  addingSpecies,
  newSpecies,
  aiLoading,
  onChange,
  onCheckboxChange,
  onSubmit,
  onAddSpeciesClick,
  onAddSpecies,
  onCancelAddSpecies,
  onNewSpeciesChange,
  onGenerateDescription,
  onClassifyBehavior,
  onGenerateTags,
  onParseResult,
  onRemoveTag,
}: AnimalFormProps): JSX.Element {
  const { species } = useSpecies();
  const [showParseModal, setShowParseModal] = useState(false);
  const [parseText, setParseText] = useState("");

  const handleParseSubmit = () => {
    if (!parseText.trim()) return;
    onParseResult(parseText);
    setShowParseModal(false);
    setParseText("");
  };

  return (
    <>
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

        <S.Row>
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
        </S.Row>

        <S.Row>
          <S.Field>
            <S.Label htmlFor="age">Age (years)</S.Label>
            <S.Input
              id="age"
              name="age"
              type="number"
              min="0"
              max="40"
              placeholder="Age"
              value={form.age ?? ""}
              onChange={onChange}
            />
          </S.Field>
          <S.Field>
            <S.Label htmlFor="size">Size</S.Label>
            <S.Select
              id="size"
              name="size"
              value={form.size ?? ""}
              onChange={onChange}
            >
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </S.Select>
          </S.Field>
        </S.Row>

        <S.Row>
          <S.Field>
            <S.Label htmlFor="energyLevel">Energy Level</S.Label>
            <S.Select
              id="energyLevel"
              name="energyLevel"
              value={form.energyLevel ?? ""}
              onChange={onChange}
            >
              <option value="">Select level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </S.Select>
          </S.Field>
          <S.Field>
            <S.Label htmlFor="temperament">Temperament</S.Label>
            <S.Inline>
              <S.Input
                id="temperament"
                name="temperament"
                placeholder="Calm, Playful..."
                value={form.temperament ?? ""}
                onChange={onChange}
              />
              <S.Button
                type="button"
                $variant="ai"
                onClick={onClassifyBehavior}
                disabled={aiLoading}
              >
                {aiLoading ? <S.Spinner /> : "AI"}
              </S.Button>
            </S.Inline>
          </S.Field>
        </S.Row>

        <S.Inline>
          <S.CheckboxRow>
            <S.Checkbox
              type="checkbox"
              name="castrated"
              checked={form.castrated ?? false}
              onChange={onCheckboxChange}
            />
            Castrated
          </S.CheckboxRow>
          <S.CheckboxRow>
            <S.Checkbox
              type="checkbox"
              name="vaccinated"
              checked={form.vaccinated ?? false}
              onChange={onCheckboxChange}
            />
            Vaccinated
          </S.CheckboxRow>
        </S.Inline>

        <S.Field>
          <S.Label htmlFor="description">Description</S.Label>
          <S.TextArea
            id="description"
            name="description"
            placeholder="Animal description for adoption..."
            value={form.description ?? ""}
            onChange={onChange}
          />
          <S.Inline>
            <S.Button
              type="button"
              $variant="ai"
              onClick={onGenerateDescription}
              disabled={aiLoading}
            >
              {aiLoading ? <S.Spinner /> : "Generate with AI"}
            </S.Button>
            <S.Button
              type="button"
              $variant="ai"
              onClick={() => setShowParseModal(true)}
              disabled={aiLoading}
            >
              Parse from text
            </S.Button>
          </S.Inline>
        </S.Field>

        <S.Field>
          <S.Label>Tags</S.Label>
          {form.tags && form.tags.length > 0 ? (
            <S.TagsWrapper>
              {form.tags.map((tag) => (
                <S.Tag key={tag}>
                  {tag}
                  <S.TagRemove type="button" onClick={() => onRemoveTag(tag)}>
                    ×
                  </S.TagRemove>
                </S.Tag>
              ))}
            </S.TagsWrapper>
          ) : (
            <S.FormHint>No tags yet.</S.FormHint>
          )}
          <S.Button
            type="button"
            $variant="ai"
            onClick={onGenerateTags}
            disabled={aiLoading}
          >
            {aiLoading ? <S.Spinner /> : "Generate tags with AI"}
          </S.Button>
        </S.Field>

        <S.Actions>
          <S.Button type="submit" $variant="primary">
            {editId !== null ? "Update" : "Add"}
          </S.Button>
        </S.Actions>
      </S.Form>

      {showParseModal && (
        <S.ModalOverlay onClick={() => setShowParseModal(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalTitle>Parse animal from text</S.ModalTitle>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#555" }}>
              Paste a description of the animal and the AI will extract the
              data.
            </p>
            <S.TextArea
              placeholder="e.g. Found a female cat named Luna, approximately 2 years old, castrated and very gentle."
              value={parseText}
              onChange={(e) => setParseText(e.target.value)}
              style={{ minHeight: "100px" }}
            />
            <S.Inline>
              <S.Button
                type="button"
                $variant="primary"
                onClick={handleParseSubmit}
                disabled={!parseText.trim()}
              >
                Parse
              </S.Button>
              <S.Button
                type="button"
                $variant="ghost"
                onClick={() => setShowParseModal(false)}
              >
                Cancel
              </S.Button>
            </S.Inline>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
}
