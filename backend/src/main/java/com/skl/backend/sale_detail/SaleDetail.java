package com.skl.backend.sale_detail;

import com.skl.backend.product_variant.ProductVariant;
import com.skl.backend.sale.Sale;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "sale_details")
public class SaleDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "product_variant", nullable = false)
    private ProductVariant productVariant;

    @ManyToOne
    @JoinColumn(name = "sale", nullable = false)
    private Sale sale;

    private int quantity;

    @Column(name = "price_at_sale")
    private int priceAtSale;

    public SaleDetail() {}

    public SaleDetail(UUID id, ProductVariant productVariant, Sale sale, int quantity, int priceAtSale) {
        this.id = id;
        this.productVariant = productVariant;
        this.sale = sale;
        this.quantity = quantity;
        this.priceAtSale = priceAtSale;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ProductVariant getProductVariant() {
        return productVariant;
    }

    public void setProductVariant(ProductVariant productVariant) {
        this.productVariant = productVariant;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPriceAtSale() {
        return priceAtSale;
    }

    public void setPriceAtSale(int priceAtSale) {
        this.priceAtSale = priceAtSale;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SaleDetail that = (SaleDetail) o;
        return quantity == that.quantity && priceAtSale == that.priceAtSale && Objects.equals(id, that.id) && Objects.equals(productVariant, that.productVariant) && Objects.equals(sale, that.sale);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, productVariant, sale, quantity, priceAtSale);
    }

    @Override
    public String toString() {
        return "SaleDetail{" +
                "id=" + id +
                ", productVariant=" + productVariant +
                ", quantity=" + quantity +
                ", priceAtSale=" + priceAtSale +
                '}';
    }

}