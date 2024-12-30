package server.objects.points;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class PointDTO {
    private int id;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private boolean drawn;
    private ZonedDateTime creationTime;
}
