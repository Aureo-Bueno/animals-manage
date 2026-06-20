import type { AnimalData } from "../../store/animal/types";

export type AnimalFormProps = {
  form: AnimalData;
  editId: number | null;
  addingSpecies: boolean;
  newSpecies: string;
  aiLoading: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAddSpeciesClick: () => void;
  onAddSpecies: () => void;
  onCancelAddSpecies: () => void;
  onNewSpeciesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateDescription: () => void;
  onClassifyBehavior: () => void;
  onGenerateTags: () => void;
  onParseResult: (text: string) => void;
  onRemoveTag: (tag: string) => void;
};
