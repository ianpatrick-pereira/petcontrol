package com.petcontrol.controller;

import com.petcontrol.dto.RecetaRequest;
import com.petcontrol.dto.RecetaResponse;
import com.petcontrol.service.RecetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RecetaController {
    
    private final RecetaService recetaService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<RecetaResponse> crearReceta(@Valid @RequestBody RecetaRequest request) {
        RecetaResponse response = recetaService.crearReceta(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<List<RecetaResponse>> obtenerTodasLasRecetas() {
        List<RecetaResponse> recetas = recetaService.obtenerTodasLasRecetas();
        return ResponseEntity.ok(recetas);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN', 'CLIENTE')")
    public ResponseEntity<RecetaResponse> obtenerRecetaPorId(@PathVariable Long id) {
        RecetaResponse response = recetaService.obtenerRecetaPorId(id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/mascota/{mascotaId}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN', 'CLIENTE')")
    public ResponseEntity<List<RecetaResponse>> obtenerRecetasPorMascota(@PathVariable Long mascotaId) {
        List<RecetaResponse> recetas = recetaService.obtenerRecetasPorMascota(mascotaId);
        return ResponseEntity.ok(recetas);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Long id) {
        recetaService.eliminarReceta(id);
        return ResponseEntity.noContent().build();
    }
}