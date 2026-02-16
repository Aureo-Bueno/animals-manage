import { useState, type JSX } from "react";
import AnimalForm from "../animal-form";
import AnimalList from "../animal-list";
import * as S from "./styles";
import { addAnimal, deleteAnimal, updateAnimal } from "../../store/animal";
import type { Animal } from "../../store/animal/types";
import { useAnimal } from "../../hooks/use-animal";
import { useSpecies } from "../../hooks/use-species";

function AnimalManager(): JSX.Element {
  const { count } = useAnimal();
  const { species, addSpecie } = useSpecies();
  const [form, setForm] = useState<{ name: string; species: string }>({
    name: "",
    species: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [addingSpecies, setAddingSpecies] = useState(false);
  const [newSpecies, setNewSpecies] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      updateAnimal(editId, form.name, form.species);
      setEditId(null);
    } else {
      addAnimal(form.name, form.species);
    }
    setForm({ name: "", species: "" });
  };

  const handleEdit = (animal: Animal) => {
    setEditId(animal.id);
    setForm({ name: animal.name, species: animal.species });
  };

  const handleAddSpecies = () => {
    if (newSpecies && !species.includes(newSpecies)) {
      addSpecie(newSpecies);
      setForm((f) => ({ ...f, species: newSpecies }));
    }
    setNewSpecies("");
    setAddingSpecies(false);
  };

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
        <S.Content>
          <S.Panel>
            <AnimalForm
              form={form}
              editId={editId}
              addingSpecies={addingSpecies}
              newSpecies={newSpecies}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onAddSpeciesClick={() => setAddingSpecies(true)}
              onAddSpecies={handleAddSpecies}
              onCancelAddSpecies={() => {
                setAddingSpecies(false);
                setNewSpecies("");
              }}
              onNewSpeciesChange={(e) => setNewSpecies(e.target.value)}
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

export default AnimalManager;
