package com.skl.backend.sale;

public interface SaleMapper {

    public Sale fromDto(SaleDto saleDto);

    public SaleDto toDto(Sale sale);

}
