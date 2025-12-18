package com.petcontrol.controller;

import com.petcontrol.dto.VacunaRequest;
import com.petcontrol.dto.VacunaResponse;
import com.petcontrol.service.VacunaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacunas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VacunaController {
    
    private final VacunaService vacunaService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<VacunaResponse> registrarVacuna(@Valid @RequestBody VacunaRequest request) {
        VacunaResponse response = vacunaService.registrarVacuna(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<List<VacunaResponse>> obtenerTodasLasVacunas() {
        List<VacunaResponse> vacunas = vacunaService.obtenerTodasLasVacunas();
        return ResponseEntity.ok(vacunas);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN', 'CLIENTE')")
    public ResponseEntity<VacunaResponse> obtenerVacunaPorId(@PathVariable Long id) {
        VacunaResponse response = vacunaService.obtenerVacunaPorId(id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/mascota/{mascotaId}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN', 'CLIENTE')")
    public ResponseEntity<List<VacunaResponse>> obtenerVacunasPorMascota(@PathVariable Long mascotaId) {
        List<VacunaResponse> vacunas = vacunaService.obtenerVacunasPorMascota(mascotaId);
        return ResponseEntity.ok(vacunas);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    public ResponseEntity<Void> eliminarVacuna(@PathVariable Long id) {
        vacunaService.eliminarVacuna(id);
        return ResponseEntity.noContent().build();
    }
}