package com.skl.backend.color;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;

    public ColorServiceImpl(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    @Override
    public List<Color> listColors() {
        return colorRepository.findAll();
    }

    @Override
    public Color createColor(Color color) {
        if(color.getId() != null)
            throw new IllegalArgumentException("The color already has an ID");
        if(color.getName() == null || color.getName().isBlank())
            throw new IllegalArgumentException("The color must have a name");

        return colorRepository.save(new Color(
                null,
                color.getName()
        ));
    }

    @Override
    public Optional<Color> getColor(UUID id) {
        return colorRepository.findById(id);
    }

    @Override
    public void deleteColor(UUID id) {
        colorRepository.deleteById(id);
    }

}