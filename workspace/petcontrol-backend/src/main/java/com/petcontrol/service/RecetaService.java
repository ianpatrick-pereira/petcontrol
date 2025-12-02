package com.petcontrol.service;

import com.petcontrol.dto.RecetaRequest;
import com.petcontrol.dto.RecetaResponse;
import com.petcontrol.model.Mascota;
import com.petcontrol.model.Receta;
import com.petcontrol.repository.MascotaRepository;
import com.petcontrol.repository.RecetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecetaService {
    
    private final RecetaRepository recetaRepository;
    private final MascotaRepository mascotaRepository;
    
    @Transactional
    public RecetaResponse crearReceta(RecetaRequest request) {
        Mascota mascota = mascotaRepository.findById(request.getMascotaId())
            .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Receta receta = new Receta();
        receta.setMascota(mascota);
        receta.setDiagnostico(request.getDiagnostico());
        receta.setMedicamentos(request.getMedicamentos());
        receta.setDosificacion(request.getDosificacion());
        receta.setIndicaciones(request.getIndicaciones());
        receta.setVeterinario(request.getVeterinario());
        receta.setDiasTratamiento(request.getDiasTratamiento());
        
        Receta savedReceta = recetaRepository.save(receta);
        return RecetaResponse.fromEntity(savedReceta);
    }
    
    public List<RecetaResponse> obtenerRecetasPorMascota(Long mascotaId) {
        return recetaRepository.findByMascotaIdOrderByFechaEmisionDesc(mascotaId)
            .stream()
            .map(RecetaResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public List<RecetaResponse> obtenerTodasLasRecetas() {
        return recetaRepository.findAll()
            .stream()
            .map(RecetaResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public RecetaResponse obtenerRecetaPorId(Long id) {
        Receta receta = recetaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Receta no encontrada"));
        return RecetaResponse.fromEntity(receta);
    }
    
    @Transactional
    public void eliminarReceta(Long id) {
        recetaRepository.deleteById(id);
    }
}
