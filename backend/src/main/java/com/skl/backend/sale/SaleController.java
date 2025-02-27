package com.skl.backend.sale;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v0/sales")
public class SaleController {

    private final SaleService saleService;
    private final SaleMapper saleMapper;

    public SaleController(SaleService saleService, SaleMapper saleMapper) {
        this.saleService = saleService;
        this.saleMapper = saleMapper;
    }

    @GetMapping
    public List<SaleDto> listSales() {
        return saleService.listSales()
                .stream()
                .map(saleMapper::toDto)
                .toList();
    }

    @GetMapping(path = "/search")
    public List<SaleDto> listSales(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end
    ) {
        return saleService.listSales(start, end)
                .stream()
                .map(saleMapper::toDto)
                .toList();
    }

    @PostMapping
    public SaleDto createSale(
            @RequestBody SaleDto saleDto
    ) {
        Sale createdSale = saleService.createSale(saleMapper.fromDto(saleDto));
        return saleMapper.toDto(createdSale);
    }

    @GetMapping(path = "/{sale_id}")
    public Optional<SaleDto> getSale(
            @PathVariable("sale_id") UUID saleId
    ) {
        return saleService.getSale(saleId).map(saleMapper::toDto);
    }

    @PutMapping(path = "/{sale_id}")
    public SaleDto updateSale(
            @PathVariable("sale_id") UUID saleId,
            @RequestBody SaleDto saleDto
    ) {
        Sale updatedSale = saleService.updateSale(
                saleId,
                saleMapper.fromDto(saleDto)
        );

        return saleMapper.toDto(updatedSale);
    }

    @DeleteMapping(path = "/{sale_id}")
    public void deleteSale(
            @PathVariable("sale_id") UUID saleId
    ) {
        saleService.deleteSale(saleId);
    }

}