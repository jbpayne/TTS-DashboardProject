package com.tts.ttsdashboardproject.configuration;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;

@Configuration
public class PageOneConfig extends RepositoryRestMvcConfiguration {

    public PageOneConfig(ApplicationContext context, ObjectFactory<ConversionService> conversionService) {
        super(context, conversionService);
    }

    @Override
    @Bean
    public HateoasPageableHandlerMethodArgumentResolver pageableResolver() {

        HateoasPageableHandlerMethodArgumentResolver resolver = super.pageableResolver();
        resolver.setOneIndexedParameters(true);
        resolver.setFallbackPageable(PageRequest.of(0, 5, Sort.by("id,asc")));
        return resolver;
    }
}