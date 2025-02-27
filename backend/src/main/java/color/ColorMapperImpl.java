package color;

import org.springframework.stereotype.Component;

@Component
public class ColorMapperImpl implements ColorMapper {

    @Override
    public Color fromDto(ColorDto colorDto) {
        return new Color(
                colorDto.id(),
                colorDto.name()
        );
    }

    @Override
    public ColorDto toDto(Color color) {
        return new ColorDto(
                color.getId(),
                color.getName()
        );
    }

}


