package com.skl.backend.product;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v0/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @GetMapping
    public List<ProductDto> listProducts() {
        return productService.listProducts()
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    @PostMapping
    public ProductDto createProduct(
            @RequestBody ProductDto productDto
    ) {
        Product createdProduct = productService.createProduct(
                productMapper.fromDto(productDto)
        );

        return productMapper.toDto(createdProduct);
    }

    @GetMapping(path = "/{product_id}")
    public Optional<ProductDto> getProduct(
            @PathVariable("product_id") UUID productId
    ) {
        return productService.getProduct(productId).map(productMapper::toDto);
    }

    @PutMapping(path = "/{product_id}")
    public ProductDto updateProduct(
            @PathVariable("product_id") UUID productId,
            @RequestBody ProductDto productDto
    ) {
        Product updatedProduct = productService.updateProduct(
                productId,
                productMapper.fromDto(productDto)
        );

        return productMapper.toDto(updatedProduct);
    }

    @DeleteMapping(path = "/{product_id}")
    public void deleteProduct(
            @PathVariable("product_id") UUID productId
    ) {
        productService.deleteProduct(productId);
    }

}