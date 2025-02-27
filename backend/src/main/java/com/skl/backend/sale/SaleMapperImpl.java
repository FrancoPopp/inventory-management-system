package com.skl.backend.sale;

import com.skl.backend.sale_detail.SaleDetailMapper;
import org.springframework.stereotype.Component;

@Component
public class SaleMapperImpl implements SaleMapper {

    private final SaleDetailMapper saleDetailMapper;

    public SaleMapperImpl(SaleDetailMapper saleDetailMapper) {
        this.saleDetailMapper = saleDetailMapper;
    }

    @Override
    public Sale fromDto(SaleDto saleDto) {
        return new Sale(
                saleDto.id(),
                saleDto.saleDate(),
                saleDto.paymentMethod(),
                saleDto.totalAmount(),
                saleDto.saleDetails().stream().map(saleDetailMapper::fromDto).toList()
        );
    }

    @Override
    public SaleDto toDto(Sale sale) {
        return new SaleDto(
                sale.getId(),
                sale.getSaleDate(),
                sale.getPaymentMethod(),
                sale.getTotalAmount(),
                sale.getSaleDetails().stream().map(saleDetailMapper::toDto).toList()
        );
    }

}