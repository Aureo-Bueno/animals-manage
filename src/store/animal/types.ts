export type AnimalData = {
  name: string;
  species: string;
  age?: number;
  size?: string;
  description?: string;
  temperament?: string;
  energyLevel?: string;
  castrated?: boolean;
  vaccinated?: boolean;
  tags?: string[];
};

export type Animal = AnimalData & { id: number };

export type State = { animals: Array<Animal>; nextId: number };
