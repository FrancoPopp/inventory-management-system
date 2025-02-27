package com.skl.backend.sale_detail;

import com.skl.backend.product_variant.ProductVariant;
import com.skl.backend.product_variant.ProductVariantRepository;
import com.skl.backend.sale.Sale;
import com.skl.backend.sale.SaleRepository;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SaleDetailServiceImpl implements SaleDetailService {

    private final SaleDetailRepository saleDetailRepository;
    private final SaleRepository saleRepository;
    private final ProductVariantRepository productVariantRepository;

    public SaleDetailServiceImpl(SaleDetailRepository saleDetailRepository, SaleRepository saleRepository, ProductVariantRepository productVariantRepository) {
        this.saleDetailRepository = saleDetailRepository;
        this.saleRepository = saleRepository;
        this.productVariantRepository = productVariantRepository;
    }

    @Override
    public List<SaleDetail> listSaleDetails(UUID saleId) {
        return saleDetailRepository.findBySaleId(saleId);
    }

    @Override
    public List<SaleDetail> createSaleDetails(UUID saleId, List<SaleDetail> saleDetails) {
        Sale sale = saleRepository.findById(saleId).orElseThrow(() ->
                new IllegalArgumentException("The sale does not exist")
        );

        return saleDetails.stream()
                .map(saleDetail -> {
                    ProductVariant productVariant = productVariantRepository
                            .findById(saleDetail.getProductVariant().getId())
                            .orElseThrow(() ->
                                    new IllegalArgumentException("The product variant does not exist")
                            );
                    return saleDetailRepository.save(new SaleDetail(
                            null,
                            productVariant,
                            sale,
                            saleDetail.getQuantity(),
                            saleDetail.getPriceAtSale()
                    ));
                }).collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    public Optional<SaleDetail> getSaleDetail(UUID id) {
        return saleDetailRepository.findById(id);
    }

    @Override
    public SaleDetail updateSaleDetail(UUID id, SaleDetail saleDetail) {
        if(saleDetail.getId() == null)
            throw new IllegalArgumentException("The sale detail must have an ID");
        if(!id.equals(saleDetail.getId()))
            throw new IllegalArgumentException("Attempting to change ID");
        if(saleDetail.getPriceAtSale() < 0)
            throw new IllegalArgumentException("Invalid price at sale");
        SaleDetail existingSaleDetail = saleDetailRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("The sale detail does not exist")
                );

        ProductVariant productVariant = productVariantRepository
                .findById(saleDetail.getProductVariant().getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("The sale detail must have an existing product variant")
                );

        Sale sale = saleRepository
                .findById(saleDetail.getSale().getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("The sale detail must have an existing sale")
                );

        existingSaleDetail.setProductVariant(productVariant);
        existingSaleDetail.setSale(sale);
        existingSaleDetail.setQuantity(saleDetail.getQuantity());
        existingSaleDetail.setPriceAtSale(saleDetail.getPriceAtSale());

        return saleDetailRepository.save(existingSaleDetail);
    }

    @Override
    public void deleteSaleDetail(UUID id) {
        saleDetailRepository.deleteById(id);
    }

}