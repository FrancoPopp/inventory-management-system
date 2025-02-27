package com.skl.backend.category;

public interface CategoryMapper {

    public Category fromDto(CategoryDto categoryDto);

    public CategoryDto toDto(Category category);

}

