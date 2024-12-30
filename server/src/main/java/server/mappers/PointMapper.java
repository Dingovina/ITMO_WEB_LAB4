package server.mappers;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import server.objects.points.ModelPoint;
import server.objects.points.PointDTO;
import server.objects.points.RequestPoint;
import server.objects.points.ResponsePoint;

public class PointMapper {
    public static PointDTO requestToDTO(RequestPoint requestPoint) {
        PointDTO point = new PointDTO();
        point.setX(Math.round(requestPoint.getX() * 1000.0) / 1000.0);
        point.setY(Math.round(requestPoint.getY() * 1000.0) / 1000.0);
        point.setR(Math.round(requestPoint.getR() * 1000.0) / 1000.0);
        point.setDrawn(requestPoint.isDrawn());
        point.setCreationTime(ZonedDateTime.now());
        return point;
    }

    public static PointDTO modelToDTO(ModelPoint point) {
        PointDTO pointDTO = new PointDTO();
        pointDTO.setId(point.getId());
        pointDTO.setX(point.getX());
        pointDTO.setY(point.getY());
        pointDTO.setR(point.getR());
        pointDTO.setHit(point.isHit());
        pointDTO.setCreationTime(ZonedDateTime.parse(point.getCreationTime()));
        return pointDTO;
    }

    public static ModelPoint dtoToModel(PointDTO point) {
        ModelPoint modelPoint = new ModelPoint();
        modelPoint.setX(point.getX());
        modelPoint.setY(point.getY());
        modelPoint.setR(point.getR());
        modelPoint.setHit(point.isHit());
        modelPoint.setCreationTime(point.getCreationTime().toString());
        return modelPoint;
    }

    public static ResponsePoint dtoToResponse(PointDTO point) {
        ResponsePoint responsePoint = new ResponsePoint();
        responsePoint.setId(point.getId());
        responsePoint.setX(point.getX());
        responsePoint.setY(point.getY());
        responsePoint.setR(point.getR());
        responsePoint.setHit(point.isHit());
        responsePoint.setCreationTime(DateTimeFormatter.ofPattern("HH:mm:ss").format(point.getCreationTime()));
        return responsePoint;
    }
}
