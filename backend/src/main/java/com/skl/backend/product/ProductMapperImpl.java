package com.skl.backend.product;

import com.skl.backend.category.CategoryService;
import com.skl.backend.product_variant.ProductVariantMapper;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class ProductMapperImpl implements ProductMapper {

    private final ProductVariantMapper productVariantMapper;
    private final CategoryService categoryService;

    public ProductMapperImpl(ProductVariantMapper productVariantMapper, CategoryService categoryService) {
        this.productVariantMapper = productVariantMapper;
        this.categoryService = categoryService;
    }

    @Override
    public Product fromDto(ProductDto productDto) {
        return new Product(
                productDto.id(),
                productDto.name(),
                productDto.price(),
                categoryService.getCategory(productDto.categoryId()).orElse(null),
                Optional.ofNullable(productDto.productVariants())
                        .map(productVariants -> productVariants.stream()
                                .map(productVariantMapper::fromDto)
                                .toList()
                        ).orElse(null)
        );
    }

    @Override
    public ProductDto toDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getCategory().getId(),
                Optional.ofNullable(product.getProductVariants())
                        .map(productVariants -> productVariants.stream()
                                .map(productVariantMapper::toDto)
                                .toList()
                        ).orElse(null)
        );
    }

}