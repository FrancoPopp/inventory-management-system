package com.skl.backend.product;

import com.skl.backend.product_variant.ProductVariantDto;
import java.util.List;
import java.util.UUID;

public record ProductDto(
        UUID id,
        String name,
        int price,
        UUID categoryId,
        List<ProductVariantDto> productVariants
) {
}


