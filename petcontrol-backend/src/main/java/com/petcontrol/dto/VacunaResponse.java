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
    private Long clienteId;
    private String clienteNombre;
    private String clienteEmail;
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
        if (vacuna.getMascota().getUsuario() != null) {
            response.setClienteId(vacuna.getMascota().getUsuario().getId());
            response.setClienteNombre(vacuna.getMascota().getUsuario().getNombre());
            response.setClienteEmail(vacuna.getMascota().getUsuario().getEmail());
        }
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
