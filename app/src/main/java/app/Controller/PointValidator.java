package app.Controller;

import java.util.ArrayList;
import java.util.Arrays;

public class PointValidator {
    private final static ArrayList<Double> VALID_X = new ArrayList<Double>(
            Arrays.asList(-3.0, -2.5, -2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0));
    private final static Double MIN_Y = -3.0;
    private final static Double MAX_Y = 5.0;
    private final static ArrayList<Double> VALID_R = new ArrayList<Double>(
        Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0));

    public static boolean isValid(RequestPoint point) {
        if (point.isDrawn()){
            return validateR(point.getR());
        }
        return validateX(point.getX()) && validateY(point.getY()) && validateR(point.getR());
    }

    private static boolean validateX(double x) {
        return VALID_X.contains(x);
    }

    private static boolean validateY(double y) {
        return MIN_Y <= y && y <= MAX_Y;
    }

    private static boolean validateR(double r) {
        return VALID_R.contains(r);
    }
}
