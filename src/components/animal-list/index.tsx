import { useState, useMemo, useEffect, useRef, type JSX } from "react";
import type { AnimalListProps } from "./types";
import * as S from "./styles";
import { useAnimal } from "../../hooks/use-animal";
import { useAI } from "../../hooks/use-ai";

export function AnimalList({ onEdit, onDelete }: AnimalListProps): JSX.Element {
  const { count, animals } = useAnimal();
  const { searchAnimals, loading: aiLoading } = useAI();
  const [search, setSearch] = useState("");
  const [aiActive, setAiActive] = useState(false);
  const [aiResultIds, setAiResultIds] = useState<number[] | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!search.trim()) {
      setAiResultIds(null);
      setAiActive(false);
    }
  }, [search]);

  useEffect(() => {
    if (!aiActive || !search.trim()) {
      setAiResultIds(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const summary = animals.map((a) => ({
        id: a.id,
        name: a.name,
        species: a.species,
        age: a.age,
        size: a.size,
        description: a.description,
        temperament: a.temperament,
        tags: a.tags,
      }));
      const ids = await searchAnimals(search, summary);
      setAiResultIds(ids);
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [aiActive, search, animals, searchAnimals]);

  const filteredAnimals = useMemo(() => {
    if (!search.trim()) return animals;

    if (aiActive && aiResultIds) {
      return animals.filter((a) => aiResultIds.includes(a.id));
    }

    if (aiActive && aiLoading) {
      return [];
    }

    const q = search.toLowerCase();
    return animals.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.species.toLowerCase().includes(q) ||
        a.temperament?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [animals, search, aiActive, aiResultIds, aiLoading]);

  return (
    <S.ListWrapper>
      <S.ListHeader>
        <div>
          <S.ListTitle>Animals</S.ListTitle>
          <S.ListHint>
            Tap edit to update details or remove entries.
          </S.ListHint>
        </div>
        <S.Count>{count}</S.Count>
      </S.ListHeader>

      <S.SearchRow>
        <S.SearchInput
          type="text"
          placeholder="Search animals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <S.ToggleButton
          type="button"
          $active={aiActive}
          onClick={() => {
            setAiActive(!aiActive);
            setAiResultIds(null);
          }}
          title="Toggle AI search"
        >
          {aiLoading ? <S.Spinner /> : "AI"}
        </S.ToggleButton>
      </S.SearchRow>

      {filteredAnimals.length === 0 && !aiLoading ? (
        <S.EmptyState>
          {search.trim()
            ? "No animals match your search."
            : "No animals added yet."}
        </S.EmptyState>
      ) : (
        <S.List>
          {filteredAnimals.map((animal) => (
            <S.ListItem key={animal.id}>
              <S.Info>
                <S.NameRow>
                  <S.Name>{animal.name}</S.Name>
                  <S.Species>{animal.species}</S.Species>
                  {animal.age != null && (
                    <S.Meta>{animal.age} years</S.Meta>
                  )}
                  {animal.size && <S.Meta>{animal.size}</S.Meta>}
                </S.NameRow>
                {animal.description && (
                  <S.Desc>{animal.description}</S.Desc>
                )}
                {animal.tags && animal.tags.length > 0 && (
                  <S.TagsRow>
                    {animal.tags.map((tag) => (
                      <S.Tag key={tag}>{tag}</S.Tag>
                    ))}
                  </S.TagsRow>
                )}
              </S.Info>
              <S.Actions>
                <S.ActionButton
                  $variant="ghost"
                  onClick={() => onEdit(animal)}
                >
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
