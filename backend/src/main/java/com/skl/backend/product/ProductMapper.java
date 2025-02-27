package com.skl.backend.product;

public interface ProductMapper {

    public Product fromDto(ProductDto productDto);

    public ProductDto toDto(Product product);

}