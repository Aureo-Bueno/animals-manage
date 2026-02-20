import { type JSX } from "react";
import type { AnimalListProps } from "./types";
import * as S from "./styles";
import { useAnimal } from "../../hooks/use-animal";

export function AnimalList({ onEdit, onDelete }: AnimalListProps): JSX.Element {
  const { count, animals } = useAnimal();
  return (
    <S.ListWrapper>
      <S.ListHeader>
        <div>
          <S.ListTitle>Animals</S.ListTitle>
          <S.ListHint>Tap edit to update details or remove entries.</S.ListHint>
        </div>
        <S.Count>{count}</S.Count>
      </S.ListHeader>
      {animals.length === 0 ? (
        <S.EmptyState>No animals added yet.</S.EmptyState>
      ) : (
        <S.List>
          {animals.map((animal) => (
            <S.ListItem key={animal.id}>
              <S.Info>
                <S.Name>{animal.name}</S.Name>
                <S.Species>{animal.species}</S.Species>
              </S.Info>
              <S.Actions>
                <S.ActionButton $variant="ghost" onClick={() => onEdit(animal)}>
                  Edit
                </S.ActionButton>
                <S.ActionButton
                  $variant="accent"
                  onClick={() => onDelete(animal.id)}
                >
                  Delete
                </S.ActionButton>
              </S.Actions>
            </S.ListItem>
          ))}
        </S.List>
      )}
    </S.ListWrapper>
  );
}

export default AnimalList;
