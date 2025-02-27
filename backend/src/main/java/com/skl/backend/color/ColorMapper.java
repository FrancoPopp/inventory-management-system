package com.skl.backend.color;

public interface ColorMapper {

    public Color fromDto(ColorDto colorDto);

    public ColorDto toDto(Color color);

}


