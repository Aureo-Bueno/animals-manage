import type { Animal } from "../../store/animal/types";

export type AnimalListProps = {
  onEdit: (animal: Animal) => void;
  onDelete: (id: number) => void;
};
