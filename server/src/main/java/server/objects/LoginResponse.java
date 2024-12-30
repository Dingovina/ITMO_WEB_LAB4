package server.objects;

public record LoginResponse(
    String email,
    String token) {

}