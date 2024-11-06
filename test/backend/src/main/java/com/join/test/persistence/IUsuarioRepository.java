package com.join.test.persistence;

import com.join.test.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioRepository extends JpaRepository<Usuario, String> {
    Usuario findByLogin(String login);
}
