package com.skl.backend.product_variant;

import com.skl.backend.color.ColorService;
import com.skl.backend.product.ProductService;
import org.springframework.stereotype.Component;

@Component
public class ProductVariantMapperImpl implements ProductVariantMapper {

    private final ProductService productService;
    private final ColorService colorService;

    public ProductVariantMapperImpl(ProductService productService, ColorService colorService) {
        this.colorService = colorService;
        this.productService = productService;
    }

    @Override
    public ProductVariant fromDto(ProductVariantDto productVariantDto) {
        return new ProductVariant(
                productVariantDto.id(),
                productVariantDto.size(),
                colorService.getColor(productVariantDto.colorId()).orElse(null),
                productVariantDto.stockLevel(),
                productService.getProduct(productVariantDto.productId()).orElse(null)
        );
    }

    @Override
    public ProductVariantDto toDto(ProductVariant productVariant) {
        return new ProductVariantDto(
                productVariant.getId(),
                productVariant.getSize(),
                productVariant.getColor().getId(),
                productVariant.getStockLevel(),
                productVariant.getProduct().getId()
        );
    }

}