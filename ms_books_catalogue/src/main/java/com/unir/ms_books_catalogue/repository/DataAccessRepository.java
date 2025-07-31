package com.unir.ms_books_catalogue.repository;

import com.unir.ms_books_catalogue.models.AggregationDetails;
import io.netty.util.internal.StringUtil;
import lombok.SneakyThrows;
import org.apache.commons.lang.StringUtils;
import org.elasticsearch.index.query.BoolQueryBuilder;
import com.unir.ms_books_catalogue.models.Book;
import com.unir.ms_books_catalogue.models.BooksQueryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedLongTerms;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class DataAccessRepository {

    // operations with book repository
    // operations with elasticsearch client
    private final BookRepository bookRepository;
    private final ElasticsearchOperations elasticClient; // This comes from ElasticSearch configuration (config)

    private final String[] titleSearchFields = {"title", "title._2gram", "title._3gram"};

    public Book save(Book book) { return bookRepository.save(book); }

    public Boolean delete(Book book) {
        bookRepository.delete(book);
        return Boolean.TRUE;
    }

    public Optional<Book> findById(String id) {
        return bookRepository.findById(id);
    }

    public List<Book> findAll() { return bookRepository.findAll(); }

    @SneakyThrows
    public BooksQueryResponse findBooks(String title, String author, List<String> categoryValues, String isbn, List<String> ratingValues, boolean visibility, String page) {

        BoolQueryBuilder querySpec = QueryBuilders.boolQuery();

        // Multimatch as I put it as search as you type
        if (!StringUtils.isEmpty(title)) {
            querySpec.must(QueryBuilders.multiMatchQuery(title, titleSearchFields).type(MultiMatchQueryBuilder.Type.BOOL_PREFIX));
        }

        if (!StringUtils.isEmpty(author)) {
            querySpec.must(QueryBuilders.matchQuery("author", author));
        }

        // should (selective) must (mandatory) and must not (negative) clauses
        if (categoryValues != null && !categoryValues.isEmpty()) {
            categoryValues.forEach(
                category -> querySpec.should(QueryBuilders.termQuery("category", category))
            );
        }

        if (!StringUtils.isEmpty(isbn)) {
            querySpec.must(QueryBuilders.termQuery("isbn", isbn));
        }

        if (ratingValues != null && !ratingValues.isEmpty()) {
            ratingValues.forEach(
                rating -> querySpec.should(QueryBuilders.termQuery("rating", Integer.parseInt(rating)))
            );
        }

        // If no filters are applied, all books are returned
        if(!querySpec.hasClauses()) {
            querySpec.must(QueryBuilders.matchAllQuery());
        }

        // Implicit filter for visibility
        // This will only return books that are visible
        querySpec.must(QueryBuilders.termQuery("visibility", visibility));

        // Build the query (querySpec)
        NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(querySpec);

        // Add aggregations for categories and ratings
        nativeSearchQueryBuilder.addAggregation(AggregationBuilders
                .terms("Category Aggregation")
                .field("category").size(1000)); // Aggregation for categories

        nativeSearchQueryBuilder.addAggregation(AggregationBuilders
                .terms("Rating Aggregation")
                .field("rating").size(1000)); // Aggregation for ratings

        nativeSearchQueryBuilder.withMaxResults(10); // Limit the number of results to 10

        // Pagination
        int pageNumber = Integer.parseInt(page);
        if (pageNumber > 0) {
            nativeSearchQueryBuilder.withPageable(PageRequest.of(pageNumber, 10)); // Pagination
        }

        Query query = nativeSearchQueryBuilder.build(); // Build the query
        SearchHits<Book> result = elasticClient.search(query, Book.class); // The result of the search

        return new BooksQueryResponse(result.getSearchHits().stream().map(SearchHit::getContent).toList(), getResponseAggregations(result));
    }


    // This method extracts the aggregations from the search result and formats them into a map
    private Map<String, List<AggregationDetails>> getResponseAggregations(SearchHits<Book> result) {
        return Map.of(
                "category", Optional.ofNullable(result.getAggregations().get("Category Aggregation"))
                        .map(ParsedLongTerms.class::cast)
                        .map(terms -> terms.getBuckets().stream()
                                .map(b -> new AggregationDetails(b.getKeyAsString(), (int) b.getDocCount()))
                                .toList())
                        .orElse(List.of()),

                "rating", Optional.ofNullable(result.getAggregations().get("Rating Aggregation"))
                        .map(ParsedLongTerms.class::cast)
                        .map(terms -> terms.getBuckets().stream()
                                .map(b -> new AggregationDetails(b.getKeyAsString(), (int) b.getDocCount()))
                                .toList())
                        .orElse(List.of())
        );
    }



}
