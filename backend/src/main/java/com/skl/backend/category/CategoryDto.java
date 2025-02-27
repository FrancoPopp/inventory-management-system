package com.skl.backend.category;

import java.util.UUID;

public record CategoryDto(
        UUID id,
        String name
) {
}

