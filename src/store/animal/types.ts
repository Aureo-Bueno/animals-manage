export type Animal = {
  id: number;
  name: string;
  species: string;
};

export type State = { animals: Array<Animal>; nextId: number }
