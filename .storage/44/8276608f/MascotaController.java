package com.petcontrol.controller;

import com.petcontrol.dto.MascotaRequest;
import com.petcontrol.dto.MascotaResponse;
import com.petcontrol.service.MascotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mascotas")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Mascotas", description = "Endpoints para gestión de mascotas")
public class MascotaController {
    
    @Autowired
    private MascotaService mascotaService;
    
    @GetMapping("/mis-mascotas")
    @Operation(summary = "Obtener mis mascotas", description = "Lista todas las mascotas del usuario autenticado")
    public ResponseEntity<List<MascotaResponse>> obtenerMisMascotas() {
        List<MascotaResponse> mascotas = mascotaService.obtenerMascotasDelUsuario();
        return ResponseEntity.ok(mascotas);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener mascota por ID", description = "Obtiene los detalles de una mascota específica")
    public ResponseEntity<MascotaResponse> obtenerMascotaPorId(@PathVariable Long id) {
        try {
            MascotaResponse mascota = mascotaService.obtenerMascotaPorId(id);
            return ResponseEntity.ok(mascota);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    
    @PostMapping
    @Operation(summary = "Crear mascota", description = "Crea una nueva mascota para el usuario autenticado")
    public ResponseEntity<MascotaResponse> crearMascota(@Valid @RequestBody MascotaRequest request) {
        MascotaResponse mascota = mascotaService.crearMascota(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mascota);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar mascota", description = "Actualiza los datos de una mascota existente")
    public ResponseEntity<MascotaResponse> actualizarMascota(
            @PathVariable Long id,
            @Valid @RequestBody MascotaRequest request) {
        try {
            MascotaResponse mascota = mascotaService.actualizarMascota(id, request);
            return ResponseEntity.ok(mascota);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar mascota", description = "Elimina una mascota del sistema")
    public ResponseEntity<Void> eliminarMascota(@PathVariable Long id) {
        try {
            mascotaService.eliminarMascota(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}