package com.join.test.controller;

import com.join.test.domain.Categoria;
import com.join.test.persistence.ICategoriaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/categorias")
public class CategoriaController extends BaseEntityCotroller<Categoria, ICategoriaRepository> {

    public CategoriaController(ICategoriaRepository repository) {
        super(repository);
    }
}
