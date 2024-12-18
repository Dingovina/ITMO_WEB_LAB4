package app.Service;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;

import app.Model.DataBaseManager;
import app.Service.managers.HitManager;
import app.Service.managers.TimeManager;
import app.dto.PointDTO;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;

@Named("pointService")
@ManagedBean
@ApplicationScoped
public class PointService implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Inject
    private DataBaseManager dataManager;

    public boolean addPoint(PointDTO point) throws ClassNotFoundException, SQLException, FileNotFoundException, IOException{
        point.setHit(HitManager.isHit(point));
        point.setTime(TimeManager.now());
        return dataManager.addPoint(point);
    }

    public ArrayList<PointDTO> getPoints(String timezone) throws SQLException {
        ArrayList<PointDTO> points = dataManager.getPoints();
        for (PointDTO point : points){
            point.setTime(TimeManager.formatTime(point.getTime(), timezone));
        }
        return points;
    }
}
