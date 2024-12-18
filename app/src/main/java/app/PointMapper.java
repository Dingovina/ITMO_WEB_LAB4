package app;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import app.Controller.RequestPoint;
import app.Controller.ResponsePoint;
import app.Model.PointModel;
import app.dto.PointDTO;

public class PointMapper {
    public static PointDTO requestToDTO(RequestPoint point){
        PointDTO pointDTO = new PointDTO();
        pointDTO.setX(point.getX());
        pointDTO.setY(point.getY());
        pointDTO.setR(point.getR());
        pointDTO.setDrawn(point.isDrawn());
        return pointDTO;
    }
    
    public static ResponsePoint dtoToResponse(PointDTO point){
        ResponsePoint responsePoint = new ResponsePoint();
        responsePoint.setX(point.getX());
        responsePoint.setY(point.getY());
        responsePoint.setR(point.getR());
        responsePoint.setHit(point.isHit());
        responsePoint.setTime(DateTimeFormatter.ofPattern("HH:mm:ss").format(point.getTime()));
        return responsePoint;
    }

    public static PointModel dtoToModel(PointDTO point){
        PointModel pointModel = new PointModel();
        pointModel.setX(point.getX());
        pointModel.setY(point.getY());
        pointModel.setR(point.getR());
        pointModel.setHit(point.isHit());
        pointModel.setDrawn(point.isDrawn());
        pointModel.setTime(point.getTime().toString());
        return pointModel;
    }

    public static PointDTO modelToDTO(PointModel point){
        PointDTO pointDTO = new PointDTO();
        pointDTO.setX(point.getX());
        pointDTO.setY(point.getY());
        pointDTO.setR(point.getR());
        pointDTO.setHit(point.isHit());
        pointDTO.setDrawn(point.isDrawn());
        pointDTO.setTime(ZonedDateTime.parse(point.getTime()));
        return pointDTO;
    }
}
