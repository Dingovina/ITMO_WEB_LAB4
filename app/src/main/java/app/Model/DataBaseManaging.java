package app.Model;

import java.sql.SQLException;
import java.util.ArrayList;

import app.dto.PointDTO;

public interface DataBaseManaging {
    boolean addPoint(PointDTO point) throws SQLException;

    ArrayList<PointDTO> getPoints() throws SQLException;
}