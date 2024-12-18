package app.Controller;

import jakarta.enterprise.context.ApplicationScoped;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;

import app.PointMapper;
import app.Service.PointService;
import app.dto.PointDTO;
import jakarta.annotation.ManagedBean;
import jakarta.inject.Inject;
import jakarta.inject.Named;

@Named("controller")
@ManagedBean
@ApplicationScoped
public class ControllerBean implements Serializable{
    private static final long serialVersionUID = 1L;

    @Inject
    private PointService pointService;

    public boolean addPoint(RequestPoint requsetPoint) throws ClassNotFoundException, FileNotFoundException, SQLException, IOException{
        if (PointValidator.isValid(requsetPoint)) {
            return pointService.addPoint(PointMapper.requestToDTO(requsetPoint));
        }
        else{
            return false;
        }
    }

    public ArrayList<ResponsePoint> getPoints(TimezoneBean timezoneBean) throws SQLException{
        ArrayList<PointDTO> points = pointService.getPoints(timezoneBean.getTimezone());
        ArrayList<ResponsePoint> responsePoints = new ArrayList<>();
        for (PointDTO point : points){
            responsePoints.add(PointMapper.dtoToResponse(point));
        }
        return responsePoints;
    }
}
