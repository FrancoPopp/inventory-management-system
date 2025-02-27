package category;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        if(category.getId() != null)
            throw new IllegalArgumentException("the category already has an ID");

        if(category.getName() == null || category.getName().isBlank())
            throw new IllegalArgumentException("The category must have a name");

        return categoryRepository.save(new Category(
                null,
                category.getName()
        ));
    }

    @Override
    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }

}

