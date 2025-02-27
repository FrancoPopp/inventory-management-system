package com.skl.backend.category;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {

    List<Category> listCategories();

    Category createCategory(Category category);

    Optional<Category> getCategory(UUID d);

    void deleteCategory(UUID id);

}

