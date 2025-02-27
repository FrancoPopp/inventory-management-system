package com.skl.backend.product_variant;

import java.util.UUID;

public record ProductVariantDto(
        UUID id,
        int size,
        UUID colorId,
        int stockLevel,
        UUID productId
) {
}