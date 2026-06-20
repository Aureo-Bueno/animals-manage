import { renderHook, act, waitFor } from "@testing-library/react";
import { useAI } from "./index";
import * as ai from "../../services/ai";

jest.mock("../../services/ai", () => ({
  generateDescription: jest.fn(),
  extractAnimalData: jest.fn(),
  searchAnimalsByQuery: jest.fn(),
  classifyBehavior: jest.fn(),
  generateTags: jest.fn(),
}));

const mockGenerateDescription = ai.generateDescription as jest.Mock;
const mockExtractAnimalData = ai.extractAnimalData as jest.Mock;
const mockSearchAnimalsByQuery = ai.searchAnimalsByQuery as jest.Mock;
const mockClassifyBehavior = ai.classifyBehavior as jest.Mock;
const mockGenerateTags = ai.generateTags as jest.Mock;

describe("useAI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("starts with loading=false and error=null", () => {
    const { result } = renderHook(() => useAI());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  describe("generateDescription", () => {
    it("sets loading while fetching and returns the description", async () => {
      mockGenerateDescription.mockResolvedValue("Friendly dog");
      const { result } = renderHook(() => useAI());

      let promise: Promise<string>;
      act(() => { promise = result.current.generateDescription({ name: "Rex" }) });

      await waitFor(() => expect(result.current.loading).toBe(true));
      const description = await act(async () => promise);
      expect(description).toBe("Friendly dog");
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it("sets error when the call fails", async () => {
      mockGenerateDescription.mockRejectedValue(new Error("API Error"));
      const { result } = renderHook(() => useAI());

      const description = await act(async () =>
        result.current.generateDescription({ name: "Rex" })
      );

      expect(description).toBe("");
      expect(result.current.error).toBe("API Error");
      expect(result.current.loading).toBe(false);
    });
  });

  describe("extractFromText", () => {
    it("returns parsed animal data on success", async () => {
      mockExtractAnimalData.mockResolvedValue({ name: "Luna", species: "Cat" });
      const { result } = renderHook(() => useAI());

      const data = await act(async () => result.current.extractFromText("Luna is a cat"));

      expect(data).toEqual({ name: "Luna", species: "Cat" });
    });

    it("returns empty object and sets error on failure", async () => {
      mockExtractAnimalData.mockRejectedValue(new Error("Parse error"));
      const { result } = renderHook(() => useAI());

      const data = await act(async () => result.current.extractFromText("invalid"));

      expect(data).toEqual({});
      expect(result.current.error).toBe("Parse error");
    });
  });

  describe("searchAnimals", () => {
    it("returns matching IDs on success", async () => {
      mockSearchAnimalsByQuery.mockResolvedValue([1, 2]);
      const { result } = renderHook(() => useAI());

      const ids = await act(async () =>
        result.current.searchAnimals("dog", [{ id: 1, name: "Rex", species: "Dog" }])
      );

      expect(ids).toEqual([1, 2]);
    });

    it("returns empty array and sets error on failure", async () => {
      mockSearchAnimalsByQuery.mockRejectedValue(new Error("Search error"));
      const { result } = renderHook(() => useAI());

      const ids = await act(async () => result.current.searchAnimals("query", []));

      expect(ids).toEqual([]);
      expect(result.current.error).toBe("Search error");
    });
  });

  describe("classifyBehavior", () => {
    it("returns classification on success", async () => {
      mockClassifyBehavior.mockResolvedValue("Playful");
      const { result } = renderHook(() => useAI());

      const classification = await act(async () =>
        result.current.classifyBehavior("plays fetch")
      );

      expect(classification).toBe("Playful");
    });

    it("returns empty string and sets error on failure", async () => {
      mockClassifyBehavior.mockRejectedValue(new Error("Classification error"));
      const { result } = renderHook(() => useAI());

      const classification = await act(async () =>
        result.current.classifyBehavior("unknown")
      );

      expect(classification).toBe("");
      expect(result.current.error).toBe("Classification error");
    });
  });

  describe("generateTags", () => {
    it("returns tags on success", async () => {
      mockGenerateTags.mockResolvedValue(["friendly", "largeSize"]);
      const { result } = renderHook(() => useAI());

      const tags = await act(async () =>
        result.current.generateTags({ name: "Rex" })
      );

      expect(tags).toEqual(["friendly", "largeSize"]);
    });

    it("returns empty array and sets error on failure", async () => {
      mockGenerateTags.mockRejectedValue(new Error("Tags error"));
      const { result } = renderHook(() => useAI());

      const tags = await act(async () => result.current.generateTags({}));

      expect(tags).toEqual([]);
      expect(result.current.error).toBe("Tags error");
    });
  });
});
