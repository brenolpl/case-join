package com.join.test.controller;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public abstract class BaseEntityCotroller<T, R extends JpaRepository<T, Integer>> {

    private final R repository;

    public BaseEntityCotroller(R repository) {
        this.repository = repository;
    }

    @GetMapping("{id}")
    public T getById(@PathVariable Integer id) {
        return repository.findById(id)
                .orElseThrow();
    }

    @GetMapping
    public List<T> get() {
        return repository.findAll();
    }

    @PostMapping
    public T create(@RequestBody T entity) {
        return repository.save(entity);
    }

    @PutMapping
    public T update(@RequestBody T entity) {
        return repository.saveAndFlush(entity);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
