package com.petcontrol.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MascotaRequest {
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotBlank(message = "La especie es obligatoria")
    private String especie;
    
    private String raza;
    
    @Positive(message = "La edad debe ser positiva")
    private Integer edad;
    
    private String descripcion;
    
    private String imagen;
}