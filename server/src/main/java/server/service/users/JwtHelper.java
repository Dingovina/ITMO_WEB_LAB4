package server.service.users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.springframework.security.core.userdetails.UserDetails;

public class JwtHelper {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final int MINUTES = 60;

    public static String generateToken(String email) {
        var now = Instant.now();
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact();
    }

    public static String extractEmail(String token) throws Exception {
        return getTokenBody(token).getSubject();
    }

    public static Boolean validateToken(String token, UserDetails userDetails) throws Exception {
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private static Claims getTokenBody(String token) throws Exception {
        try {
        return Jwts
            .parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();
        } catch (SignatureException | ExpiredJwtException e) { // Invalid signature or expired token
        throw new Exception("Access denied: " + e.getMessage());
        }
    }

    private static boolean isTokenExpired(String token) throws Exception {
        Claims claims = getTokenBody(token);
        return claims.getExpiration().before(new Date());
    }
}