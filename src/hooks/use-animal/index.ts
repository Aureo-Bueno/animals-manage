import { useStore } from "@tanstack/react-store";
import { animalStore } from "../../store/animal/store";

export const useAnimal = () => {
  const animals = useStore(animalStore, (s) => s.animals);

  return {
    animals,
    count: animals.length
  }
}
