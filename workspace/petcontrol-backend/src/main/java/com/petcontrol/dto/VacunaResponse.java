package com.petcontrol.dto;

import com.petcontrol.model.Vacuna;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacunaResponse {
    
    private Long id;
    private Long mascotaId;
    private String nombreMascota;
    private String nombreVacuna;
    private LocalDate fechaAplicacion;
    private LocalDate proximaDosis;
    private String lote;
    private String veterinarioResponsable;
    private String observaciones;
    private LocalDateTime fechaCreacion;
    
    public static VacunaResponse fromEntity(Vacuna vacuna) {
        VacunaResponse response = new VacunaResponse();
        response.setId(vacuna.getId());
        response.setMascotaId(vacuna.getMascota().getId());
        response.setNombreMascota(vacuna.getMascota().getNombre());
        response.setNombreVacuna(vacuna.getNombreVacuna());
        response.setFechaAplicacion(vacuna.getFechaAplicacion());
        response.setProximaDosis(vacuna.getProximaDosis());
        response.setLote(vacuna.getLote());
        response.setVeterinarioResponsable(vacuna.getVeterinarioResponsable());
        response.setObservaciones(vacuna.getObservaciones());
        response.setFechaCreacion(vacuna.getFechaCreacion());
        return response;
    }
}
