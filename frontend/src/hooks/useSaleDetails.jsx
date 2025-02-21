import { useQuery } from "@tanstack/react-query";
import { fetchSaleDetails } from "../services/saleDetails";

export const useSaleDetails = (saleId) => {
  const {
    data: saleDetails = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["saleDetails", saleId],
    queryFn: () => fetchSaleDetails(saleId),
  });

  return {
    saleDetails,
    isLoading,
    isError,
  };
};
