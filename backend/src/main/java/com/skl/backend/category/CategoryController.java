package com.skl.backend.category;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v0/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @GetMapping
    public List<CategoryDto> listCategories() {
        return categoryService.listCategories()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @PostMapping
    public CategoryDto createCategory(
            @RequestBody CategoryDto categoryDto
    ) {
        Category createdCategory = categoryService.createCategory(
                categoryMapper.fromDto(categoryDto)
        );

        return categoryMapper.toDto(createdCategory);
    }

    @DeleteMapping(path = "/{category_id}")
    public void deleteCategory(
            @PathVariable("category_id") UUID categoryId
    ) {
        categoryService.deleteCategory(categoryId);
    }

}
