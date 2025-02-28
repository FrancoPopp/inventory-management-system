package com.skl.backend.sale;

import com.skl.backend.sale_detail.SaleDetail;
import com.skl.backend.sale_detail.SaleDetailService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final SaleDetailService saleDetailService;

    public SaleServiceImpl(SaleRepository saleRepository, SaleDetailService saleDetailService) {
        this.saleRepository = saleRepository;
        this.saleDetailService = saleDetailService;
    }

    @Override
    public List<Sale> listSales() {
        return saleRepository.findAll();
    }

    @Override
    public List<Sale> listSales(LocalDateTime start, LocalDateTime end) {
        return saleRepository.findAllBySaleDateBetween(start, end);
    }

    @Override
    public Sale createSale(Sale sale) {
        if(sale.getId() != null)
            throw new IllegalArgumentException("The sale already has an ID");
        if(sale.getPaymentMethod() == null)
            throw new IllegalArgumentException("The sale must have a payment method");
        if(sale.getSaleDetails() == null || sale.getSaleDetails().isEmpty())
            throw new IllegalArgumentException("The sale must have at least one sale detail");

        Sale newSale = new Sale(
                null,
                LocalDateTime.now(),
                sale.getPaymentMethod(),
                0,
                null
        );

        Sale savedSale = saleRepository.save(newSale);
        List<SaleDetail> saleDetails = saleDetailService.createSaleDetails(savedSale.getId(), sale.getSaleDetails());
        savedSale.setSaleDetails(saleDetails);

        int totalAmount = saleDetails.stream()
                .map(saleDetail -> saleDetail.getPriceAtSale() * saleDetail.getQuantity())
                .reduce(0, Integer::sum);

        savedSale.setTotalAmount(totalAmount);

        return saleRepository.save(savedSale);
    }

    @Override
    public Optional<Sale> getSale(UUID id) {
        return id == null ? Optional.empty() : saleRepository.findById(id);
    }

    @Transactional
    @Override
    public Sale updateSale(UUID id, Sale sale) {
        if(sale.getId() == null)
            throw new IllegalArgumentException("The sale must have an ID");
        if(!id.equals(sale.getId()))
            throw new IllegalArgumentException("Attempting to change ID");
        if(sale.getSaleDate() == null)
            throw new IllegalArgumentException("The sale must have a date");
        if(sale.getPaymentMethod() == null)
            throw new IllegalArgumentException("The sale must have a payment method");
        if(sale.getSaleDetails() == null || sale.getSaleDetails().isEmpty())
            throw new IllegalArgumentException("The sale must have at least one sale detail");

        Sale existingSale = saleRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("The sale does not exist")
        );

        existingSale.setSaleDate(sale.getSaleDate());
        existingSale.setPaymentMethod(sale.getPaymentMethod());

        List<SaleDetail> saleDetails = saleDetailService.createSaleDetails(id, sale.getSaleDetails());
        existingSale.setSaleDetails(saleDetails);

        int totalAmount = saleDetails.stream()
                .map(saleDetail -> saleDetail.getPriceAtSale() * saleDetail.getQuantity())
                .reduce(0, Integer::sum);

        existingSale.setTotalAmount(totalAmount);

        return saleRepository.save(existingSale);
    }

    @Override
    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }

}