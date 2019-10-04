package com.tts.ttsdashboardproject.repositories;

import com.tts.ttsdashboardproject.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByDiscount(Double discount);
}
