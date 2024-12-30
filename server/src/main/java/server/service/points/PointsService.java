package server.service.points;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.mappers.PointMapper;
import server.model.RepositoryManager;
import server.objects.points.ModelPoint;
import server.objects.points.PointDTO;

@Service
public class PointsService {
    @Autowired
    private RepositoryManager repositoryManager;

    public ArrayList<PointDTO> getPoints(String timezone) throws SQLException {
        ArrayList<ModelPoint> points = (ArrayList<ModelPoint>) repositoryManager.findAll();
        ArrayList<PointDTO> responsePoints = new ArrayList<PointDTO>();
        for (ModelPoint point : points) {
            PointDTO pointDTO = PointMapper.modelToDTO(point);
            pointDTO.setCreationTime(TimeManager.formatTime(pointDTO.getCreationTime(), timezone));
            responsePoints.add(pointDTO);
        }
        return responsePoints;
    }

    public void addPoint(PointDTO point) throws SQLException {
        point.setHit(HitManager.isHit(point));
        repositoryManager.save(PointMapper.dtoToModel(point));
    }
}
