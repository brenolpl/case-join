package com.join.test.controller;

import com.join.test.domain.Usuario;
import com.join.test.persistence.IUsuarioRepository;
import com.join.test.security.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("api/security")
public class SecurityController {

    private final PasswordEncoder passwordEncoder;
    private final IUsuarioRepository usuarioRepository;

    public SecurityController(PasswordEncoder passwordEncoder, IUsuarioRepository usuarioRepository) {
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("registrar")
    public Map<String, String> criarUsuario(@RequestBody Usuario usuario, HttpServletRequest request) {
        Usuario createdUser = usuarioRepository.findByLogin(usuario.getLogin());
        if(createdUser != null) throw new RuntimeException("Usuario já existente");
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
        usuario.setSenha(null);
        Map<String, String> map = new HashMap<>();
        map.put("access_token", JWTUtils.createToken(usuario.getLogin(), request.getRequestURI()));
        return map;
    }

    @GetMapping("is-valid")
    public boolean isValid(HttpServletRequest request, HttpServletResponse response) {
        try {
            String token = request.getHeader(AUTHORIZATION);
            JWTUtils.verifyToken(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
