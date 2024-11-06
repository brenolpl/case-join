package com.join.test.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

public class JWTUtils {

    private static final String SIGNING_KEY = "#@0HB97W9lnB";
    private static final int ACCESS_TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(SIGNING_KEY);

    public static String createToken(String user, String issuer) {
        Algorithm algorithm = Algorithm.HMAC256(SIGNING_KEY);
        return JWT.create()
                .withSubject(user)
                .withIssuer(issuer)
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .sign(algorithm);

    }

    public static void verifyToken(String token) {
        JWTVerifier verifier = JWT.require(ALGORITHM).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String login = decodedJWT.getSubject();
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(login, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
