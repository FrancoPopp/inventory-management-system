import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { useCategoriesApi } from "../services/useCategoriesApi";

export const useCategories = () => {
  const { fetchCategories, addCategory, deleteCategory } = useCategoriesApi();
  const queryClient = new QueryClient();
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.name;
  };

  return {
    categories,
    isLoading,
    isError,
    addCategory: addCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    getCategoryName,
  };
};
