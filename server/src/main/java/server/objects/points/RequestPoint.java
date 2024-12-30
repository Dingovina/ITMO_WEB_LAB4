package server.objects.points;

import lombok.Data;

@Data
public class RequestPoint {
    private double x;
    private double y;
    private double r;
    private boolean drawn;
}
