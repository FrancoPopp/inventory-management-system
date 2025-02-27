package com.skl.backend.sale;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

    List<Sale> findAllBySaleDateBetween(LocalDateTime from, LocalDateTime to);

}


