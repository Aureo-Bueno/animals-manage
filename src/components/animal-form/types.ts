export type AnimalFormProps = {
  form: { name: string; species: string };
  editId: number | null;
  addingSpecies: boolean;
  newSpecies: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAddSpeciesClick: () => void;
  onAddSpecies: () => void;
  onCancelAddSpecies: () => void;
  onNewSpeciesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
