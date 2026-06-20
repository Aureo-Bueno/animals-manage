import { useState, useCallback, type JSX } from "react";
import * as S from "./styles";
import type { Animal, AnimalData } from "../../store/animal/types";
import { useSpecies } from "../../hooks/use-species";
import { AnimalForm } from "../animal-form";
import { useAnimal } from "../../hooks/use-animal";
import { useAI } from "../../hooks/use-ai";
import { AnimalList } from "../animal-list";

const emptyForm: AnimalData = {
  name: "",
  species: "",
  age: undefined,
  size: "",
  description: "",
  temperament: "",
  energyLevel: "",
  castrated: false,
  vaccinated: false,
  tags: [],
};

export function AnimalManager(): JSX.Element {
  const { count, addAnimal, deleteAnimal, updateAnimal } = useAnimal();
  const { species, addSpecies } = useSpecies();
  const {
    loading: aiLoading,
    error: aiError,
    generateDescription,
    extractFromText,
    classifyBehavior,
    generateTags,
  } = useAI();

  const [form, setForm] = useState<AnimalData>(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [addingSpecies, setAddingSpecies] = useState(false);
  const [newSpecies, setNewSpecies] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value === "" ? undefined : value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((f) => ({ ...f, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: AnimalData = {
      ...form,
      age: form.age || undefined,
      size: form.size || undefined,
      temperament: form.temperament || undefined,
      energyLevel: form.energyLevel || undefined,
      description: form.description || undefined,
    };

    if (editId !== null) {
      updateAnimal(editId, data);
      setEditId(null);
    } else {
      addAnimal(data);
    }
    setForm(emptyForm);
  };

  const handleEdit = useCallback((animal: Animal) => {
    setEditId(animal.id);
    setForm({
      name: animal.name,
      species: animal.species,
      age: animal.age,
      size: animal.size ?? "",
      description: animal.description ?? "",
      temperament: animal.temperament ?? "",
      energyLevel: animal.energyLevel ?? "",
      castrated: animal.castrated ?? false,
      vaccinated: animal.vaccinated ?? false,
      tags: animal.tags ?? [],
    });
  }, []);

  const handleAddSpecies = () => {
    if (newSpecies && !species.includes(newSpecies)) {
      addSpecies(newSpecies);
      setForm((f) => ({ ...f, species: newSpecies }));
    }
    setNewSpecies("");
    setAddingSpecies(false);
  };

  const handleGenerateDescription = async () => {
    const desc = await generateDescription(form);
    if (desc) {
      setForm((f) => ({ ...f, description: desc }));
    }
  };

  const handleClassifyBehavior = async () => {
    const observations = form.description || form.name || form.species;
    if (!observations) return;
    const result = await classifyBehavior(observations);
    if (result) {
      setForm((f) => ({ ...f, temperament: result }));
    }
  };

  const handleGenerateTags = async () => {
    const tags = await generateTags(form);
    if (tags.length > 0) {
      setForm((f) => ({
        ...f,
        tags: [...new Set([...(f.tags ?? []), ...tags])],
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags?.filter((t) => t !== tag) ?? [],
    }));
  };

  const handleParseResult = useCallback(
    async (text: string) => {
      const data = await extractFromText(text);
      if (Object.keys(data).length > 0) {
        setForm((f) => ({
          ...f,
          ...data,
          tags: f.tags ?? [],
        }));
      }
    },
    [extractFromText]
  );

  return (
    <S.Page>
      <S.Card>
        <S.Header>
          <div>
            <S.Title>Animal Management</S.Title>
            <S.Subtitle>
              Organize your animals and keep species consistent.
            </S.Subtitle>
          </div>
          <S.Stat>
            <S.StatLabel>Animals</S.StatLabel>
            <S.StatValue>{count}</S.StatValue>
          </S.Stat>
        </S.Header>
        {aiError && <S.ErrorMessage>{aiError}</S.ErrorMessage>}
        <S.Content>
          <S.Panel>
            <AnimalForm
              form={form}
              editId={editId}
              addingSpecies={addingSpecies}
              newSpecies={newSpecies}
              aiLoading={aiLoading}
              onChange={handleChange}
              onCheckboxChange={handleCheckboxChange}
              onSubmit={handleSubmit}
              onAddSpeciesClick={() => setAddingSpecies(true)}
              onAddSpecies={handleAddSpecies}
              onCancelAddSpecies={() => {
                setAddingSpecies(false);
                setNewSpecies("");
              }}
              onNewSpeciesChange={(e) => setNewSpecies(e.target.value)}
              onGenerateDescription={handleGenerateDescription}
              onClassifyBehavior={handleClassifyBehavior}
              onGenerateTags={handleGenerateTags}
              onParseResult={handleParseResult}
              onRemoveTag={handleRemoveTag}
            />
          </S.Panel>
          <S.Panel>
            <AnimalList onEdit={handleEdit} onDelete={deleteAnimal} />
          </S.Panel>
        </S.Content>
      </S.Card>
    </S.Page>
  );
}
