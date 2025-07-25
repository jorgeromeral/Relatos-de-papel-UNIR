package com.unir.ms_books_catalogue.service;

import com.unir.ms_books_catalogue.models.Book;
import com.unir.ms_books_catalogue.models.BooksQueryResponse;
import com.unir.ms_books_catalogue.models.CreateBookRequest;
import com.unir.ms_books_catalogue.repository.DataAccessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final DataAccessRepository dataAccessRepository;

    // Find books elasticsearch
    public BooksQueryResponse getBooks(String title,
                                       String author,
                                       List<String> categoryValues,
                                       String isbn,
                                       List<String> ratingValues,
                                       boolean visibility,
                                       String page
    ){
        return dataAccessRepository.findBooks(title, author, categoryValues, isbn, ratingValues, visibility, page);
    }

    // Find book by id
    public Book getBookById(String bookId) {
        return dataAccessRepository.findById(bookId).orElse(null);
    }

    // Remove book by id
    public Boolean removeBook(String bookId) {

        Book book = dataAccessRepository.findById(bookId).orElse(null);
        if (book != null) {
            dataAccessRepository.delete(book);
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    public boolean patchBook(String id, Book newBook) {
        Optional<Book> actualBook = dataAccessRepository.findById(id);

        if (actualBook.isPresent()) {
            Book book = actualBook.get();
            if(newBook.getTitle() != null) book.setTitle(newBook.getTitle());
            if(newBook.getAuthor() != null) book.setAuthor(newBook.getAuthor());
            if(newBook.getCategory() != null) book.setCategory(newBook.getCategory());
            if(newBook.getIsbn() != null) book.setIsbn(newBook.getIsbn());
            if(newBook.getRating() >= 0 && newBook.getRating() <= 5) book.setRating(newBook.getRating());
            if(newBook.getStock() > 0) book.setStock(newBook.getStock());
            if(newBook.isVisibility()) book.setVisibility(true);
            if(!newBook.isVisibility()) book.setVisibility(false);
            dataAccessRepository.save(book);
            return true;
        }
        return false;
    }

    // Create book using the request model
    public Book createBook(CreateBookRequest request) {

        // If request not empty and all fields are valid
        if (request != null
                && StringUtils.hasText(request.getTitle())
                && StringUtils.hasText(request.getAuthor())
                && StringUtils.hasText(request.getCategory())
                && StringUtils.hasText(request.getIsbn())
                && request.getRating() >= 0 && request.getRating() <= 5
                && request.getStock() > 0) {

            // Create a new book instance using the builder pattern and trim the fields
            Book book = Book.builder()
                    .title(request.getTitle().trim())
                    .author(request.getAuthor().trim())
                    .category(request.getCategory().trim())
                    .isbn(request.getIsbn().trim())
                    .rating(request.getRating())
                    .visibility(request.isVisibility())
                    .stock(request.getStock())
                    .build();

            return dataAccessRepository.save(book);
        } else {
            return null; // Return null if the request is invalid
        }
    }
}