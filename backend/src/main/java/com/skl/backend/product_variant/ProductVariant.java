package com.skl.backend.product_variant;

import com.skl.backend.color.Color;
import com.skl.backend.product.Product;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private int size;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    @Column(nullable = false)
    private int stockLevel;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductVariant() {}

    public ProductVariant(UUID id, int size, Color color, int stockLevel, Product product) {
        this.id = id;
        this.size = size;
        this.color = color;
        this.stockLevel = stockLevel;
        this.product = product;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public int getStockLevel() {
        return stockLevel;
    }

    public void setStockLevel(int stockLevel) {
        this.stockLevel = stockLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProductVariant that = (ProductVariant) o;
        return size == that.size && stockLevel == that.stockLevel && Objects.equals(id, that.id) && Objects.equals(product, that.product) && Objects.equals(color, that.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, product, size, color, stockLevel);
    }

    @Override
    public String toString() {
        return "ProductVariant{" +
                "id=" + id +
                ", product=" + product +
                ", size=" + size +
                ", color=" + color.toString() +
                ", stockLevel=" + stockLevel +
                '}';
    }

}