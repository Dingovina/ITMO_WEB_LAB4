package server.mappers;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import server.objects.ModelPoint;
import server.objects.PointDTO;
import server.objects.RequestPoint;
import server.objects.ResponsePoint;

public class PointMapper {
    public static PointDTO requestToDTO(RequestPoint requestPoint) {
        PointDTO point = new PointDTO();
        point.setX(requestPoint.getX());
        point.setY(requestPoint.getY());
        point.setR(requestPoint.getR());
        point.setDrawn(requestPoint.isDrawn());
        point.setCreationTime(ZonedDateTime.now());
        return point;
    }

    public static PointDTO modelToDTO(ModelPoint point) {
        PointDTO pointDTO = new PointDTO();
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
        responsePoint.setX(point.getX());
        responsePoint.setY(point.getY());
        responsePoint.setR(point.getR());
        responsePoint.setHit(point.isHit());
        responsePoint.setCreationTime(DateTimeFormatter.ofPattern("HH:mm:ss").format(point.getCreationTime()));
        return responsePoint;
    }
}
