package com.skl.backend.product;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> listProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(Product product) {
        if(product.getId() != null)
            throw new IllegalArgumentException("The product already has an ID");

        if(product.getName() == null || product.getName().isBlank())
            throw new IllegalArgumentException("The product must have a name");

        if(product.getCategory() == null)
            throw new IllegalArgumentException("Invalid category");

        return productRepository.save(new Product(
                null,
                product.getName(),
                product.getPrice(),
                product.getCategory(),
                null
        ));
    }

    @Override
    public Optional<Product> getProduct(UUID id) {
        return productRepository.findById(id);
    }

    @Transactional
    @Override
    public Product updateProduct(UUID id, Product product) {
        if(product.getId() == null)
            throw new IllegalArgumentException("The product must have an ID");
        if(!id.equals(product.getId()))
            throw new IllegalArgumentException("Attempting to change ID");
        if(product.getName() == null || product.getName().isBlank())
            throw new IllegalArgumentException("The product must have a name");
        if(product.getCategory() == null)
            throw new IllegalArgumentException("Invalid category");
        if(product.getPrice() < 0)
            throw new IllegalArgumentException("Invalid price");
        Product existingProduct = productRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("The product does not exist"));

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setProductVariants(product.getProductVariants());

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

}