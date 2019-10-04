package com.tts.ttsdashboardproject.repositories;

import com.tts.ttsdashboardproject.entities.Categories;
import com.tts.ttsdashboardproject.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = Categories.class)
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
