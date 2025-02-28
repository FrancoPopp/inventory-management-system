package com.skl.backend.product_variant;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v0/products")
public class ProductVariantController {

    private final ProductVariantService productVariantService;
    private final ProductVariantMapper productVariantMapper;

    public ProductVariantController(ProductVariantService productVariantService, ProductVariantMapper productVariantMapper) {
        this.productVariantService = productVariantService;
        this.productVariantMapper = productVariantMapper;
    }

    @GetMapping(path = "/{product_id}/variants")
    public List<ProductVariantDto> listProductVariants(
            @PathVariable("product_id") UUID productId
    ) {
        return productVariantService.listProductVariants(productId)
                .stream()
                .map(productVariantMapper::toDto)
                .toList();
    }

    @PostMapping(path = "/{product_id}/variants")
    public ProductVariantDto createProductVariant(
            @PathVariable("product_id") UUID productId,
            @RequestBody ProductVariantDto productVariantDto
    ) {
        ProductVariant createdProductVariant = productVariantService.createProductVariant(
                productId,
                productVariantMapper.fromDto(productVariantDto)
        );

        return productVariantMapper.toDto(createdProductVariant);
    }

    @GetMapping(path = "/variants/{product_variant_id}")
    public Optional<ProductVariantDto> getProductVariant(
            @PathVariable("product_variant_id") UUID productVariantId
    ) {
        return productVariantService.getProductVariant(productVariantId)
                .map(productVariantMapper::toDto);
    }

    @GetMapping(path = "/{product_id}/variants/search")
    public List<ProductVariantDto> getProductVariantsBySize(
            @RequestParam int size,
            @PathVariable("product_id") UUID productId
    ) {
        return productVariantService.getProductVariantsBySize(productId, size)
                .stream()
                .map(productVariantMapper::toDto)
                .toList();
    }

    @PutMapping(path = "/variants/{product_variant_id}")
    public ProductVariantDto updateProductVariant(
            @PathVariable("product_variant_id") UUID productVariantId,
            @RequestBody ProductVariantDto productVariantDto
    ) {
        ProductVariant updatedProductVariant = productVariantService.updateProductVariant(
                productVariantId,
                productVariantMapper.fromDto(productVariantDto)
        );

        return productVariantMapper.toDto(updatedProductVariant);
    }

    @DeleteMapping(path = "/variants/{product_variant_id}")
    public void deleteProductVariant(
            @PathVariable("product_variant_id") UUID productVariantId
    ) {
        productVariantService.deleteProductVariant(productVariantId);
    }

    @PatchMapping(path = "/variants/{product_variant_id}")
    public ProductVariantDto addToStockLevel(
            @PathVariable("product_variant_id") UUID productVariantId
    ) {
        System.out.println("ProductVariantController.addToStockLevel");
        return productVariantMapper.toDto(productVariantService.updateStock(productVariantId, 1));
    }

}