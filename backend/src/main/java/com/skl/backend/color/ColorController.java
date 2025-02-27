package com.skl.backend.color;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v0/colors")
public class ColorController {

    private final ColorService colorService;
    private final ColorMapper colorMapper;

    public ColorController(ColorService colorService, ColorMapper colorMapper) {
        this.colorService = colorService;
        this.colorMapper = colorMapper;
    }

    @GetMapping
    public List<ColorDto> listColors() {
        return colorService.listColors()
                .stream()
                .map(colorMapper::toDto)
                .toList();
    }

    @PostMapping
    public ColorDto createColor(
            @RequestBody ColorDto colorDto
    ) {
        Color createdColor = colorService.createColor(
                colorMapper.fromDto(colorDto)
        );

        return colorMapper.toDto(createdColor);
    }

    @DeleteMapping(path = "/{color_id}")
    public void deleteColor(
            @PathVariable("color_id") UUID colorId
    ) {
        colorService.deleteColor(colorId);
    }

}