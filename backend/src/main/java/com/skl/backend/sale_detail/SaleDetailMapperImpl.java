package com.skl.backend.sale_detail;

import com.skl.backend.product_variant.ProductVariantService;
import com.skl.backend.sale.SaleService;
import org.springframework.stereotype.Component;

@Component
public class SaleDetailMapperImpl implements SaleDetailMapper {

    private final ProductVariantService productVariantService;
    private final SaleService saleService;

    public SaleDetailMapperImpl(ProductVariantService productVariantService, SaleService saleService) {
        this.productVariantService = productVariantService;
        this.saleService = saleService;
    }

    @Override
    public SaleDetail fromDto(SaleDetailDto saleDetailDto) {
        return new SaleDetail(
                saleDetailDto.id(),
                productVariantService.getProductVariant(saleDetailDto.productVariantId()).orElse(null),
                saleService.getSale(saleDetailDto.saleId()).orElse(null),
                saleDetailDto.quantity(),
                saleDetailDto.priceAtSale()
        );
    }

    @Override
    public SaleDetailDto toDto(SaleDetail saleDetail) {
        return new SaleDetailDto(
                saleDetail.getId(),
                saleDetail.getProductVariant().getId(),
                saleDetail.getSale().getId(),
                saleDetail.getQuantity(),
                saleDetail.getPriceAtSale()
        );
    }

}