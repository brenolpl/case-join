package com.join.test.controller;

import com.join.test.domain.Produto;
import com.join.test.persistence.IProdutoRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/produtos")
public class ProdutoController extends BaseEntityCotroller<Produto, IProdutoRepository> {

    public ProdutoController(IProdutoRepository repository) {
        super(repository);
    }
}
