import { fetchColors, addColor, deleteColor } from "../services/colors";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useColors = () => {
  const queryClient = useQueryClient();
  const {
    data: colors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });

  const addColorMutation = useMutation({
    mutationFn: addColor,
    onSuccess: () => {
      queryClient.invalidateQueries(["colors"]);
    },
  });

  const deleteColorMutation = useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries(["colors"]);
    },
  });

  const getColorName = (colorId) => {
    return colors.find((color) => color.id === colorId)?.name;
  };

  return {
    colors,
    isLoading,
    isError,
    addColor: addColorMutation.mutate,
    deleteColor: deleteColorMutation.mutate,
    getColorName,
  };
};
