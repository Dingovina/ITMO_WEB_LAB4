package app.Model.dbManagers;

import java.sql.SQLException;
import java.util.ArrayList;

import org.hibernate.Session;
import org.hibernate.Transaction;

import app.PointMapper;
import app.Model.DataBaseManaging;
import app.Model.PointModel;
import app.dto.PointDTO;
import app.utils.HibernateSessionFactoryUtil;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.annotation.ManagedBean;

@Named("HibernateManager")
@ManagedBean
@ApplicationScoped
public class HibernateManager implements DataBaseManaging {

    @Override
    public boolean addPoint(PointDTO pointDTO) throws SQLException {
        PointModel point = PointMapper.dtoToModel(pointDTO);
        try (Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession()) {
            Transaction tx1 = session.beginTransaction();
            session.persist(point);
            tx1.commit();
            return true;
        }
    }

    @Override
    public ArrayList<PointDTO> getPoints() throws SQLException {
        try (Session session = HibernateSessionFactoryUtil.getSessionFactory().openSession()) {
            ArrayList<PointModel> points = (ArrayList<PointModel>) session.createQuery("FROM PointModel", PointModel.class).getResultList();
            ArrayList<PointDTO> pointsDTO = new ArrayList<>();
            for (PointModel point : points){
                pointsDTO.add(PointMapper.modelToDTO(point));
            }
            return pointsDTO;
        }
    }
}
