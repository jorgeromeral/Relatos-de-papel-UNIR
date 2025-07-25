package com.unir.ms_books_catalogue.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AggregationDetails {

    private String key; // Key for the aggregation (category, author, etc.)
    private Integer count; // Nº of elements for this key
}
