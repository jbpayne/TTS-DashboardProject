package com.tts.ttsdashboardproject.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "Categories", types = Category.class)
public interface Categories {
    int getCategoryId();
    String getCategoryName();
}
