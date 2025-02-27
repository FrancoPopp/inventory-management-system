package com.skl.backend.sale_detail;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SaleDetailService {

    List<SaleDetail> listSaleDetails(UUID saleId);

    List<SaleDetail> createSaleDetails(UUID saleId, List<SaleDetail> saleDetails);

    Optional<SaleDetail> getSaleDetail(UUID id);

    SaleDetail updateSaleDetail(UUID id, SaleDetail saleDetail);

    void deleteSaleDetail(UUID id);

}