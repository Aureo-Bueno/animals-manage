import type { Animal } from "./types";

export const initialAnimals: Animal[] = [
  {
    id: 1,
    name: "Rex",
    species: "Dog",
    age: 5,
    size: "Large",
    description: "Rex is a large-sized dog, approximately 5 years old. Animals with this profile tend to be active and make excellent companions for families with space for physical activities.",
    temperament: "Protective",
    energyLevel: "High",
    castrated: true,
    vaccinated: true,
    tags: ["largeSize", "castrated", "vaccinated"],
  },
  {
    id: 2,
    name: "Mimi",
    species: "Cat",
    age: 3,
    size: "Small",
    description: "Mimi is a small-sized cat, approximately 3 years old. Cats with this profile are independent and affectionate, ideal for apartments.",
    temperament: "Independent",
    energyLevel: "Medium",
    castrated: true,
    vaccinated: true,
    tags: ["smallSize", "castrated", "vaccinated", "apartment"],
  },
];
