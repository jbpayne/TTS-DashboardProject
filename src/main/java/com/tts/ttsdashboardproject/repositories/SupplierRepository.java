package com.tts.ttsdashboardproject.repositories;

import com.tts.ttsdashboardproject.entities.Supplier;
import com.tts.ttsdashboardproject.entities.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = Suppliers.class)
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}

