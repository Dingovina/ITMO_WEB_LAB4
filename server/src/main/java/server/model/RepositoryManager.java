package server.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import server.objects.ModelPoint;

@Repository
public interface RepositoryManager extends JpaRepository<ModelPoint, Integer> {
}