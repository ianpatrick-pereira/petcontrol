package com.petcontrol.service;

import com.petcontrol.dto.VacunaRequest;
import com.petcontrol.dto.VacunaResponse;
import com.petcontrol.model.Mascota;
import com.petcontrol.model.Vacuna;
import com.petcontrol.repository.MascotaRepository;
import com.petcontrol.repository.VacunaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VacunaService {
    
    private final VacunaRepository vacunaRepository;
    private final MascotaRepository mascotaRepository;
    
    @Transactional
    public VacunaResponse registrarVacuna(VacunaRequest request) {
        Mascota mascota = mascotaRepository.findById(request.getMascotaId())
            .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Vacuna vacuna = new Vacuna();
        vacuna.setMascota(mascota);
        vacuna.setNombreVacuna(request.getNombreVacuna());
        vacuna.setFechaAplicacion(request.getFechaAplicacion());
        vacuna.setProximaDosis(request.getProximaDosis());
        vacuna.setLote(request.getLote());
        vacuna.setVeterinarioResponsable(request.getVeterinarioResponsable());
        vacuna.setObservaciones(request.getObservaciones());
        
        Vacuna savedVacuna = vacunaRepository.save(vacuna);
        return VacunaResponse.fromEntity(savedVacuna);
    }
    
    public List<VacunaResponse> obtenerVacunasPorMascota(Long mascotaId) {
        return vacunaRepository.findByMascotaIdOrderByFechaAplicacionDesc(mascotaId)
            .stream()
            .map(VacunaResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public List<VacunaResponse> obtenerTodasLasVacunas() {
        return vacunaRepository.findAll()
            .stream()
            .map(VacunaResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public VacunaResponse obtenerVacunaPorId(Long id) {
        Vacuna vacuna = vacunaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vacuna no encontrada"));
        return VacunaResponse.fromEntity(vacuna);
    }
    
    @Transactional
    public void eliminarVacuna(Long id) {
        vacunaRepository.deleteById(id);
    }
}
