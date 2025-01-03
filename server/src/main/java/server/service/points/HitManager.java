package server.service.points;

import server.objects.points.PointDTO;

public class HitManager {
    
    public static boolean isHit(PointDTO point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();
        if (x >= 0 && y >= 0) {
            return x <= r / 2 && y <= r;
        }
        if (x <= 0 && y <= 0) {
            return y >= (-x - r / 2);
        }
        if (x >= 0 && y <= 0) {
            return x * x + y * y <= r * r;
        }
        return false;
    }
    
}