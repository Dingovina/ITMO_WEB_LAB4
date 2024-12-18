package app.Model;

import java.sql.SQLException;
import java.util.ArrayList;

import app.Model.dbManagers.HibernateManager;
import app.Model.dbManagers.JDBCManager;
import app.dto.PointDTO;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

@Named("dbManager")
@ManagedBean
@ApplicationScoped
public class DataBaseManager implements DataBaseManaging{
    @Inject
    private JDBCManager jdbcManager;
    @Inject
    private HibernateManager hibernateManager;

    private DBManagers dbManagers = DBManagers.JDBCManager;

    public void setDbManagers(String manager) {
        dbManagers = DBManagers.valueOf(manager);
    }
    public String getDbManagers() {
        return dbManagers.toString();
    }

    @Override
    public boolean addPoint(PointDTO point) throws SQLException {
        switch (dbManagers) {
            case JDBCManager:
                return jdbcManager.addPoint(point);
            case HibernateManager:
                return hibernateManager.addPoint(point);
            default:
                throw new UnsupportedOperationException("Unsupported database manager: " + dbManagers);
        }
    }

    @Override
    public ArrayList<PointDTO> getPoints() throws SQLException {
        System.out.println("Getting points from " + dbManagers);
        switch (dbManagers) {
            case JDBCManager:
                return jdbcManager.getPoints();
            case HibernateManager:
                return hibernateManager.getPoints();        
            default:
                throw new UnsupportedOperationException("Unsupported database manager: " + dbManagers);
        }
    }
    
}
