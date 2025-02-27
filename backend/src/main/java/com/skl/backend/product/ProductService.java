package com.skl.backend.product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {

    List<Product> listProducts();

    Product createProduct(Product product);

    Optional<Product> getProduct(UUID id);

    Product updateProduct(UUID id, Product product);

    void deleteProduct(UUID id);

}


