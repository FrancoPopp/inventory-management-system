package com.skl.backend.product_variant;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductVariantService {

    List<ProductVariant> listProductVariants(UUID productId);

    ProductVariant createProductVariant(UUID productId, ProductVariant productVariant);

    Optional<ProductVariant> getProductVariant(UUID id);

    List<ProductVariant> getProductVariantsBySize(UUID productId, int size);

    ProductVariant updateProductVariant(UUID id, ProductVariant productVariant);

    void deleteProductVariant(UUID id);

    ProductVariant updateStock(UUID id, int dif);

}