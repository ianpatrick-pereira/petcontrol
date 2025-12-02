package com.petcontrol.dto;

import com.petcontrol.model.Mascota;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MascotaResponse {
    private Long id;
    private String nombre;
    private String especie;
    private String raza;
    private Integer edad;
    private String descripcion;
    private String imagen;
    private Long usuarioId;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    
    public static MascotaResponse fromEntity(Mascota mascota) {
        MascotaResponse response = new MascotaResponse();
        response.setId(mascota.getId());
        response.setNombre(mascota.getNombre());
        response.setEspecie(mascota.getEspecie());
        response.setRaza(mascota.getRaza());
        response.setEdad(mascota.getEdad());
        response.setDescripcion(mascota.getDescripcion());
        response.setImagen(mascota.getImagen());
        response.setUsuarioId(mascota.getUsuario().getId());
        response.setFechaCreacion(mascota.getFechaCreacion());
        response.setFechaActualizacion(mascota.getFechaActualizacion());
        return response;
    }
}