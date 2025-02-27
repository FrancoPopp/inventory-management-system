package com.skl.backend.sale;

import com.skl.backend.sale_detail.SaleDetail;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "sale_date", nullable = false)
    private LocalDateTime saleDate;

    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "total_amount", nullable = false)
    private int totalAmount;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleDetail> saleDetails;

    public Sale() {}

    public Sale(UUID id, LocalDateTime saleDate, PaymentMethod paymentMethod, int totalAmount, List<SaleDetail> saleDetails) {
        this.id = id;
        this.saleDate = saleDate;
        this.paymentMethod = paymentMethod;
        this.totalAmount = totalAmount;
        this.saleDetails = saleDetails;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<SaleDetail> getSaleDetails() {
        return saleDetails;
    }

    public void setSaleDetails(List<SaleDetail> saleDetails) {
        this.saleDetails = saleDetails;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Sale sale = (Sale) o;
        return totalAmount == sale.totalAmount && Objects.equals(id, sale.id) && Objects.equals(saleDate, sale.saleDate) && paymentMethod == sale.paymentMethod && Objects.equals(saleDetails, sale.saleDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, saleDate, paymentMethod, totalAmount, saleDetails);
    }

    @Override
    public String toString() {
        return "Sale{" +
                "id=" + id +
                ", date=" + saleDate +
                ", paymentMethod=" + paymentMethod +
                ", totalAmount=" + totalAmount +
                ", saleDetails=" + saleDetails +
                '}';
    }

}