import { useState, useCallback } from "react";
import type { AnimalData } from "../../store/animal/types";
import * as ai from "../../services/ai";

type AnimalSummary = {
  id: number;
  name: string;
  species: string;
  age?: number;
  size?: string;
  description?: string;
  temperament?: string;
  tags?: string[];
};

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDescription = useCallback(
    async (data: Partial<AnimalData>): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ai.generateDescription(data);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error generating description";
        setError(message);
        return "";
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const extractFromText = useCallback(
    async (text: string): Promise<Partial<AnimalData>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ai.extractAnimalData(text);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error extracting data";
        setError(message);
        return {};
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const searchAnimals = useCallback(
    async (
      query: string,
      animals: AnimalSummary[]
    ): Promise<number[]> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ai.searchAnimalsByQuery(query, animals);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error searching";
        setError(message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const classifyBehavior = useCallback(
    async (observations: string): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ai.classifyBehavior(observations);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error classifying behavior";
        setError(message);
        return "";
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const generateTags = useCallback(
    async (data: Partial<AnimalData>): Promise<string[]> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ai.generateTags(data);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error generating tags";
        setError(message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    generateDescription,
    extractFromText,
    searchAnimals,
    classifyBehavior,
    generateTags,
  };
}
