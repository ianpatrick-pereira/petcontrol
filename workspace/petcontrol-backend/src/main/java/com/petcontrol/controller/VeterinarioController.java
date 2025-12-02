package com.petcontrol.controller;

import com.petcontrol.dto.*;
import com.petcontrol.model.Mascota;
import com.petcontrol.model.Usuario;
import com.petcontrol.repository.MascotaRepository;
import com.petcontrol.repository.UsuarioRepository;
import com.petcontrol.service.RecetaService;
import com.petcontrol.service.VacunaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/veterinario")
@RequiredArgsConstructor
@Tag(name = "Veterinario", description = "Endpoints para veterinarios")
@SecurityRequirement(name = "bearer-jwt")
public class VeterinarioController {

    private final MascotaRepository mascotaRepository;
    private final UsuarioRepository usuarioRepository;
    private final VacunaService vacunaService;
    private final RecetaService recetaService;

    @GetMapping("/mascotas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver todas las mascotas", description = "Veterinarios pueden ver todas las mascotas registradas en el sistema")
    public ResponseEntity<List<MascotaResponse>> getAllMascotas() {
        List<Mascota> mascotas = mascotaRepository.findAll();
        List<MascotaResponse> response = mascotas.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/mascotas/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver detalle de una mascota", description = "Ver información completa de cualquier mascota")
    public ResponseEntity<MascotaResponse> getMascotaById(@PathVariable Long id) {
        return mascotaRepository.findById(id)
            .map(mascota -> ResponseEntity.ok(convertToResponse(mascota)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/mascotas/buscar")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Buscar mascotas", description = "Buscar mascotas por nombre o especie")
    public ResponseEntity<List<MascotaResponse>> buscarMascotas(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String especie) {
        
        List<Mascota> mascotas = mascotaRepository.findAll();
        
        if (nombre != null && !nombre.isEmpty()) {
            mascotas = mascotas.stream()
                .filter(m -> m.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .collect(Collectors.toList());
        }
        
        if (especie != null && !especie.isEmpty()) {
            mascotas = mascotas.stream()
                .filter(m -> m.getEspecie().toLowerCase().contains(especie.toLowerCase()))
                .collect(Collectors.toList());
        }
        
        List<MascotaResponse> response = mascotas.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    // ==================== VACUNAS ====================
    
    @PostMapping("/vacunas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Registrar vacuna", description = "Registrar una nueva vacuna aplicada a una mascota")
    public ResponseEntity<VacunaResponse> registrarVacuna(@Valid @RequestBody VacunaRequest request) {
        VacunaResponse vacuna = vacunaService.registrarVacuna(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(vacuna);
    }
    
    @GetMapping("/vacunas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Listar todas las vacunas", description = "Ver todas las vacunas registradas en el sistema")
    public ResponseEntity<List<VacunaResponse>> listarTodasLasVacunas() {
        List<VacunaResponse> vacunas = vacunaService.obtenerTodasLasVacunas();
        return ResponseEntity.ok(vacunas);
    }
    
    @GetMapping("/vacunas/mascota/{mascotaId}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver vacunas de una mascota", description = "Consultar el historial de vacunas de una mascota específica")
    public ResponseEntity<List<VacunaResponse>> obtenerVacunasPorMascota(@PathVariable Long mascotaId) {
        List<VacunaResponse> vacunas = vacunaService.obtenerVacunasPorMascota(mascotaId);
        return ResponseEntity.ok(vacunas);
    }
    
    @GetMapping("/vacunas/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver detalle de vacuna", description = "Obtener información detallada de una vacuna")
    public ResponseEntity<VacunaResponse> obtenerVacunaPorId(@PathVariable Long id) {
        try {
            VacunaResponse vacuna = vacunaService.obtenerVacunaPorId(id);
            return ResponseEntity.ok(vacuna);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/vacunas/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Eliminar vacuna", description = "Eliminar un registro de vacuna")
    public ResponseEntity<Void> eliminarVacuna(@PathVariable Long id) {
        vacunaService.eliminarVacuna(id);
        return ResponseEntity.noContent().build();
    }
    
    // ==================== RECETAS ====================
    
    @PostMapping("/recetas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Crear receta médica", description = "Emitir una nueva receta médica para una mascota")
    public ResponseEntity<RecetaResponse> crearReceta(@Valid @RequestBody RecetaRequest request) {
        RecetaResponse receta = recetaService.crearReceta(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(receta);
    }
    
    @GetMapping("/recetas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Listar todas las recetas", description = "Ver todas las recetas médicas emitidas")
    public ResponseEntity<List<RecetaResponse>> listarTodasLasRecetas() {
        List<RecetaResponse> recetas = recetaService.obtenerTodasLasRecetas();
        return ResponseEntity.ok(recetas);
    }
    
    @GetMapping("/recetas/mascota/{mascotaId}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver recetas de una mascota", description = "Consultar el historial de recetas médicas de una mascota")
    public ResponseEntity<List<RecetaResponse>> obtenerRecetasPorMascota(@PathVariable Long mascotaId) {
        List<RecetaResponse> recetas = recetaService.obtenerRecetasPorMascota(mascotaId);
        return ResponseEntity.ok(recetas);
    }
    
    @GetMapping("/recetas/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver detalle de receta", description = "Obtener información completa de una receta médica")
    public ResponseEntity<RecetaResponse> obtenerRecetaPorId(@PathVariable Long id) {
        try {
            RecetaResponse receta = recetaService.obtenerRecetaPorId(id);
            return ResponseEntity.ok(receta);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/recetas/{id}")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Eliminar receta", description = "Eliminar una receta médica")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Long id) {
        recetaService.eliminarReceta(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== OTROS ENDPOINTS ====================

    @GetMapping("/usuarios")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver lista de dueños", description = "Ver todos los usuarios registrados (dueños de mascotas)")
    public ResponseEntity<List<Map<String, Object>>> getAllDuenos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<Map<String, Object>> response = usuarios.stream()
            .map(usuario -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", usuario.getId());
                map.put("email", usuario.getEmail());
                map.put("nombre", usuario.getNombre());
                map.put("rol", usuario.getRol().toString());
                map.put("cantidadMascotas", usuario.getMascotas().size());
                return map;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/estadisticas")
    @PreAuthorize("hasAnyRole('VETERINARIO', 'ADMIN')")
    @Operation(summary = "Ver estadísticas", description = "Ver estadísticas generales del sistema")
    public ResponseEntity<Map<String, Object>> getEstadisticas() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalMascotas = mascotaRepository.count();
        long totalUsuarios = usuarioRepository.count();
        
        List<Mascota> mascotas = mascotaRepository.findAll();
        Map<String, Long> especiesCount = mascotas.stream()
            .collect(Collectors.groupingBy(Mascota::getEspecie, Collectors.counting()));
        
        stats.put("totalMascotas", totalMascotas);
        stats.put("totalUsuarios", totalUsuarios);
        stats.put("mascotasPorEspecie", especiesCount);
        
        return ResponseEntity.ok(stats);
    }

    private MascotaResponse convertToResponse(Mascota mascota) {
        return MascotaResponse.fromEntity(mascota);
    }
}