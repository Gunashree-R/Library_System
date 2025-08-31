package com.example.LibrarySystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LibrarySystem.entity.Book;


public interface BookRepository extends JpaRepository<Book, Long> {
}

