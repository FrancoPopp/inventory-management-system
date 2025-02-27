package com.skl.backend.color;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ColorService {

    List<Color> listColors();

    Color createColor(Color color);

    Optional<Color> getColor(UUID id);

    void deleteColor(UUID id);

}


