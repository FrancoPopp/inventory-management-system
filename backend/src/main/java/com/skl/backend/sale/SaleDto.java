package com.skl.backend.sale;

import com.skl.backend.sale_detail.SaleDetailDto;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record SaleDto(
        UUID id,
        LocalDateTime saleDate,
        PaymentMethod paymentMethod,
        int totalAmount,
        List<SaleDetailDto> saleDetails
) {
}