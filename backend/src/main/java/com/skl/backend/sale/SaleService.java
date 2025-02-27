package com.skl.backend.sale;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SaleService {

    List<Sale> listSales();

    List<Sale> listSales(LocalDateTime start, LocalDateTime end);

    Sale createSale(Sale sale);

    Optional<Sale> getSale(UUID id);

    Sale updateSale(UUID id, Sale sale);

    void deleteSale(UUID id);

}