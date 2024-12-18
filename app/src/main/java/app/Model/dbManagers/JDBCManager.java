package app.Model.dbManagers;

import java.sql.Statement;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import app.Model.DataBaseManaging;
import app.dto.PointDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

@Named("JDBCManager")
@ManagedBean
@ApplicationScoped
public class JDBCManager implements DataBaseManaging {
    private String HOST_NAME;
    private String PORT;
    private String DB_NAME;
    private String TABLE_NAME;
    private String URL;
    private Properties properties = new Properties();
    
    private Connection connection;
    private Statement statement;

    private void loadDatabaseConfig() throws IOException {
        try (FileInputStream fis = new FileInputStream("db.cfg")) {
            properties.load(fis);
        }
        HOST_NAME = properties.getProperty("HOST_NAME");
        PORT = properties.getProperty("PORT");
        DB_NAME = properties.getProperty("DB_NAME");
        TABLE_NAME = properties.getProperty("TABLE_NAME");
        URL = "jdbc:postgresql://" + HOST_NAME + ":" + PORT + "/" + DB_NAME;
    }
    
    public JDBCManager() throws SQLException, ClassNotFoundException, FileNotFoundException, IOException {
        Class.forName("org.postgresql.Driver");
        loadDatabaseConfig();
        if (connection == null){
            connection = DriverManager.getConnection(URL, properties);
        }
        statement = connection.createStatement();
        createTable();        
    }

    private void createTable() throws SQLException {
        String query = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME + " (\n" +
                        "  id SERIAL PRIMARY KEY,\n" +
                        "  x double precision,\n" +
                        "  y double precision,\n" + 
                        "  r double precision,\n" +
                        "  hit boolean,\n" +
                        "  drawn boolean,\n" +
                        "  time varchar(255)\n" +
                        ")";
        statement.executeUpdate(query);
    }
    
    @Override
    public boolean addPoint(PointDTO point) throws SQLException {
        String query = "INSERT INTO " + TABLE_NAME + " (x, y, r, hit, drawn, time)\n" +
                        "VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setDouble(1, point.getX());
            ps.setDouble(2, point.getY());
            ps.setDouble(3, point.getR());
            ps.setBoolean(4, point.isHit());
            ps.setBoolean(5, point.isDrawn());
            ps.setString(6, point.getTime().toString());
            return ps.executeUpdate() == 1;
        }
        catch (SQLException e) {
            return false;
        }
    }
    
    @Override
    public ArrayList<PointDTO> getPoints() throws SQLException {
        String query = "SELECT x, y, r, hit, time\n" +
                        "FROM " + TABLE_NAME;
        ArrayList<PointDTO> list = new ArrayList<>();
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            PointDTO point = new PointDTO();
            point.setX(rs.getDouble(1));
            point.setY(rs.getDouble(2));
            point.setR(rs.getDouble(3));
            point.setHit(rs.getBoolean(4));
            point.setTime(ZonedDateTime.parse(rs.getString(5)));
            list.add(point);
        }
        return list;
    }
}

