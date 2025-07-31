package com.unir.ms_books_catalogue.controller;

import com.unir.ms_books_catalogue.models.Book;
import com.unir.ms_books_catalogue.models.BooksQueryResponse;
import com.unir.ms_books_catalogue.models.CreateBookRequest;
import com.unir.ms_books_catalogue.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    // Search books with facets (aggregation), pagination, and filtering
    @GetMapping("/search")
    public ResponseEntity<BooksQueryResponse> getBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) List<String> categoryValues, // Facets (aggregation)
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) List<String> ratingValues, // Facets (aggregation)
            @RequestParam(required = false) Boolean visibility,
            @RequestParam(required = false, defaultValue = "0") String page // Pagination
    ) {

        BooksQueryResponse response = bookService.getBooks(
                title,
                author,
                categoryValues,
                isbn,
                ratingValues,
                visibility,
                page
        );
        return ResponseEntity.ok(response);
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Book book = bookService.getBookById(id);
        return book != null ? ResponseEntity.ok(book) : ResponseEntity.notFound().build();
    }

    // Get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return books != null ? ResponseEntity.ok(books) : ResponseEntity.notFound().build();
    }

    // Create a new book
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody CreateBookRequest bookRequest) {
        Book book = bookService.createBook(bookRequest);
        return book != null ? ResponseEntity.ok(book) : ResponseEntity.badRequest().build();
    }

    // Modify a book by ID
    @PatchMapping("/{id}")
    public ResponseEntity<Book> patchBook(@PathVariable String id, @RequestBody Book book) {
        return bookService.patchBook(id, book) ? ResponseEntity.ok(book) : ResponseEntity.notFound().build();
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteBook(@PathVariable String id) {
        return bookService.removeBook(id) ? ResponseEntity.ok(Map.of("message", "Book deleted successfully")) : ResponseEntity.notFound().build();
    }



}
