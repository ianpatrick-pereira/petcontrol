package com.petcontrol.dto;

import com.petcontrol.model.Receta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaResponse {
    
    private Long id;
    private Long mascotaId;
    private String nombreMascota;
    private Long clienteId;
    private String clienteNombre;
    private String clienteEmail;
    private String diagnostico;
    private String medicamentos;
    private String dosificacion;
    private String indicaciones;
    private String veterinario;
    private LocalDateTime fechaEmision;
    private Integer diasTratamiento;
    
    public static RecetaResponse fromEntity(Receta receta) {
        RecetaResponse response = new RecetaResponse();
        response.setId(receta.getId());
        response.setMascotaId(receta.getMascota().getId());
        response.setNombreMascota(receta.getMascota().getNombre());
        if (receta.getMascota().getUsuario() != null) {
            response.setClienteId(receta.getMascota().getUsuario().getId());
            response.setClienteNombre(receta.getMascota().getUsuario().getNombre());
            response.setClienteEmail(receta.getMascota().getUsuario().getEmail());
        }
        response.setDiagnostico(receta.getDiagnostico());
        response.setMedicamentos(receta.getMedicamentos());
        response.setDosificacion(receta.getDosificacion());
        response.setIndicaciones(receta.getIndicaciones());
        response.setVeterinario(receta.getVeterinario());
        response.setFechaEmision(receta.getFechaEmision());
        response.setDiasTratamiento(receta.getDiasTratamiento());
        return response;
    }
}
