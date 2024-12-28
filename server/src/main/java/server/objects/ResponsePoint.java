package server.objects;


import lombok.Data;

@Data
public class ResponsePoint {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String creationTime;
}
