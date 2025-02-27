package com.skl.backend.product_variant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, UUID> {

    List<ProductVariant> findByProductId(UUID productId);
    List<ProductVariant> findAllByProductIdAndSize(UUID productId, int size);

}