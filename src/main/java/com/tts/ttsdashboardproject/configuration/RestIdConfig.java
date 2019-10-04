package com.tts.ttsdashboardproject.configuration;

import com.tts.ttsdashboardproject.entities.Category;
import com.tts.ttsdashboardproject.entities.Product;
import com.tts.ttsdashboardproject.entities.Supplier;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;


@Configuration
public class RestIdConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Product.class, Category.class, Supplier.class);
    }

}
