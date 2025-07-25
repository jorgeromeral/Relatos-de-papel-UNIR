package com.unir.ms_books_catalogue.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookRequest {
    // Class that defines the fields that the request to create a book should have
    private String title;
    private String author;
    private String category;
    private String isbn;
    private int rating;
    private boolean visibility;
    private int stock;
}
