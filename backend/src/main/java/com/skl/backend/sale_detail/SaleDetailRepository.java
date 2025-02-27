package com.skl.backend.sale_detail;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, UUID> {
    List<SaleDetail> findBySaleId(UUID saleId);
}