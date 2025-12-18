package com.petcontrol.repository;

import com.petcontrol.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    List<Receta> findByMascotaId(Long mascotaId);
    List<Receta> findByMascotaIdOrderByFechaEmisionDesc(Long mascotaId);
}
