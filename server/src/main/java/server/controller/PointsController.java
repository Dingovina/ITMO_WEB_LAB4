package server.controller;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import server.mappers.PointMapper;
import server.objects.points.PointDTO;
import server.objects.points.RequestPoint;
import server.objects.points.ResponsePoint;
import server.service.points.PointsService;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class PointsController {
    
    @Autowired
    private PointsService pointsService;
    
    @GetMapping("/points")
    public ResponseEntity<ArrayList<ResponsePoint>> getPoints(@RequestParam(required = false) String timezone) throws SQLException {
        if (timezone == null) {
            timezone = "UTC";
        }
        ArrayList<PointDTO> points = pointsService.getPoints(timezone);
        ArrayList<ResponsePoint> responsePoints = new ArrayList<ResponsePoint>();
        for (PointDTO point : points) {
            responsePoints.add(PointMapper.dtoToResponse(point));
        }
        return new ResponseEntity<>(responsePoints, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPoint(@RequestBody RequestPoint requestPoint) throws SQLException {
        if (!PointValidator.isValid(requestPoint)) {
            return new ResponseEntity<>("Invalid point", HttpStatus.BAD_REQUEST);
        }
        PointDTO point = PointMapper.requestToDTO(requestPoint);
        pointsService.addPoint(point);
        return new ResponseEntity<>("Point added", HttpStatus.OK);
    }
}
