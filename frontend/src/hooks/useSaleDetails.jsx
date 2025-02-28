import { useQuery } from "@tanstack/react-query";
import { useSaleDetailsApi } from "../services/useSaleDetailsApi";

export const useSaleDetails = (saleId) => {
  const { fetchSaleDetails } = useSaleDetailsApi();
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
