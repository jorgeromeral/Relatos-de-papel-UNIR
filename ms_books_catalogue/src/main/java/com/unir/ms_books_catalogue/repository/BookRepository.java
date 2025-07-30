package com.unir.ms_books_catalogue.repository;

import com.unir.ms_books_catalogue.models.Book;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends ElasticsearchRepository<Book, String> {

    List<Book> findByTitle(String title);

    Optional<Book> findById(String id);

    Book save(Book book);

    void delete(Book book);

    List<Book> findAll();
}

