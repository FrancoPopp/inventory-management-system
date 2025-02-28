package com.skl.backend.product_variant;

import com.skl.backend.product.Product;
import com.skl.backend.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ProductRepository productRepository;

    public ProductVariantServiceImpl(ProductVariantRepository productVariantRepository, ProductRepository productRepository) {
        this.productVariantRepository = productVariantRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductVariant> listProductVariants(UUID productId) {
        return productVariantRepository.findByProductId(productId);
    }

    @Transactional
    @Override
    public ProductVariant createProductVariant(UUID productId, ProductVariant productVariant) {
        if(productVariant.getId() != null)
            throw new IllegalArgumentException("The product variant already has an ID");
        if(productVariant.getSize() < 0)
            throw new IllegalArgumentException("Invalid size");
        if(productVariant.getColor() == null)
            throw new IllegalArgumentException("The product variant must have a color");
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new IllegalArgumentException("The product does not exist")
        );

        return productVariantRepository.save(new ProductVariant(
                null,
                productVariant.getSize(),
                productVariant.getColor(),
                productVariant.getStockLevel(),
                product
        ));
    }

    @Override
    public Optional<ProductVariant> getProductVariant(UUID id) {
        return productVariantRepository.findById(id);
    }

    @Override
    public List<ProductVariant> getProductVariantsBySize(UUID productId, int size) {
        return productVariantRepository.findAllByProductIdAndSize(productId, size);
    }

    @Transactional
    @Override
    public ProductVariant updateProductVariant(UUID id, ProductVariant productVariant) {
        if(productVariant.getId() == null)
            throw new IllegalArgumentException("The product variant must have an ID");
        if(!id.equals(productVariant.getId()))
            throw new IllegalArgumentException("Attempting to change ID");
        if(productVariant.getSize() < 0)
            throw new IllegalArgumentException("Invalid size");
        if(productVariant.getColor() == null)
            throw new IllegalArgumentException("The product variant must have a color");
        if(productVariant.getStockLevel() < 0)
            throw new IllegalArgumentException("Invalid stock level");
        ProductVariant existingProductVariant = productVariantRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("The product variant does not exist")
        );

        existingProductVariant.setSize(productVariant.getSize());
        existingProductVariant.setColor(productVariant.getColor());
        existingProductVariant.setStockLevel(productVariant.getStockLevel());

        return productVariantRepository.save(existingProductVariant);
    }

    @Override
    public void deleteProductVariant(UUID id) {
        productVariantRepository.deleteById(id);
    }

    @Override
    public ProductVariant updateStock(UUID id, int dif) {
        ProductVariant productVariant = productVariantRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("The product variant does not exist")
        );

        productVariant.setStockLevel(productVariant.getStockLevel() + dif);

        return productVariantRepository.save(productVariant);
    }

}