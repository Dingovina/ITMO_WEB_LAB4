package app.dto;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class PointDTO {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private boolean drawn;
    private ZonedDateTime time;
}
