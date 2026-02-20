import { useStore } from "@tanstack/react-store";
import { animalStore } from "../../store/animal/store";
import { addAnimal, deleteAnimal, updateAnimal } from "../../store/animal";

export const useAnimal = () => {
  const animals = useStore(animalStore, s => s.animals)
  const count = useStore(animalStore, s => s.animals.length)
  const nextId = useStore(animalStore, s => s.nextId)

  return {
    animals,
    count,
    nextId,
    addAnimal,
    deleteAnimal,
    updateAnimal,
  }
}
