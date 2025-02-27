package com.skl.backend.sale_detail;

public interface SaleDetailMapper {

    public SaleDetail fromDto(SaleDetailDto saleDetailDto);

    public SaleDetailDto toDto(SaleDetail saleDetail);

}