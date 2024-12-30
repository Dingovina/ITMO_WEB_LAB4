package server.objects.users;

public record LoginResponse(
    String email,
    String token) {

}