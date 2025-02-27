package com.skl.backend.sale_detail;

import java.util.UUID;

public record SaleDetailDto(
        UUID id,
        UUID productVariantId,
        UUID saleId,
        int quantity,
        int priceAtSale
) {
}