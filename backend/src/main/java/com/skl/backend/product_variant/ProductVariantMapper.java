package com.skl.backend.product_variant;

public interface ProductVariantMapper {

    public ProductVariant fromDto(ProductVariantDto productVariantDto);

    public ProductVariantDto toDto(ProductVariant productVariant);

}