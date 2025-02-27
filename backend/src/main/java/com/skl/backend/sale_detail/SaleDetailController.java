package com.skl.backend.sale_detail;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v0/sales/{sale_id}/details")
public class SaleDetailController {

    private final SaleDetailService saleDetailService;
    private final SaleDetailMapper saleDetailMapper;

    public SaleDetailController(SaleDetailService saleDetailService, SaleDetailMapper saleDetailMapper) {
        this.saleDetailService = saleDetailService;
        this.saleDetailMapper = saleDetailMapper;
    }

    @GetMapping
    public List<SaleDetailDto> listSaleDetails(
            @PathVariable("sale_id") UUID saleId
    ) {
        return saleDetailService.listSaleDetails(saleId)
                .stream()
                .map(saleDetailMapper::toDto)
                .toList();
    }

    @PostMapping
    public List<SaleDetailDto> createSaleDetails(
            @PathVariable("sale_id") UUID saleId,
            @RequestBody List<SaleDetailDto> saleDetailsDto
    ) {
        List<SaleDetail> createdSaleDetails = saleDetailService.createSaleDetails(
                saleId,
                saleDetailsDto.stream().map(saleDetailMapper::fromDto).toList()
        );

        return createdSaleDetails.stream().map(saleDetailMapper::toDto).toList();
    }

    @GetMapping(path = "/{sale_detail_id}")
    public Optional<SaleDetailDto> getSaleDetail(
            @PathVariable("sale_detail_id") UUID saleDetailId
    ) {
        return saleDetailService.getSaleDetail(saleDetailId).map(saleDetailMapper::toDto);
    }

    @PutMapping(path = "/{sale_detail_id}")
    public SaleDetailDto updateSaleDetail(
            @PathVariable("sale_detail_id") UUID saleDetailId,
            @RequestBody SaleDetailDto saleDetailDto
    ) {
        SaleDetail updatedSaleDetail = saleDetailService.updateSaleDetail(
                saleDetailId,
                saleDetailMapper.fromDto(saleDetailDto)
        );

        return saleDetailMapper.toDto(updatedSaleDetail);
    }

    @DeleteMapping(path = "/{sale_detail_id}")
    public void deleteSaleDetail(
            @PathVariable("sale_detail_id") UUID saleDetailId
    ) {
        saleDetailService.deleteSaleDetail(saleDetailId);
    }

}