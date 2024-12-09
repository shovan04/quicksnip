import slugify from "../utils/slugify";
import { useFetch } from "./useFetch";
import { useAppContext } from "../contexts/AppContext";
import { SnippetType } from "../types";

type CategoryData = {
  categoryName: string;
  snippets: SnippetType[];
};

export const useSnippets = () => {
  const { language, category } = useAppContext();
  const { data, loading, error } = useFetch<CategoryData[]>(
    `/data/${slugify(language.lang)}.json`
  );

  const fetchedSnippets = data
    ? data.find((item) => item.categoryName === category)?.snippets
    : [];

  return { fetchedSnippets, loading, error };
};