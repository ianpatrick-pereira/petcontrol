package com.petcontrol.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecetaRequest {
    
    @NotNull(message = "El ID de la mascota es obligatorio")
    private Long mascotaId;
    
    @NotBlank(message = "El diagnóstico es obligatorio")
    private String diagnostico;
    
    @NotBlank(message = "Los medicamentos son obligatorios")
    private String medicamentos;
    
    private String dosificacion;
    
    private String indicaciones;
    
    @NotBlank(message = "El nombre del veterinario es obligatorio")
    private String veterinario;
    
    private Integer diasTratamiento;
}
