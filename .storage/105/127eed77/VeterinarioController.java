package com.petcontrol.controller;

import com.petcontrol.dto.MascotaResponse;
import com.petcontrol.model.Mascota;
import com.petcontrol.model.Usuario;
import com.petcontrol.repository.MascotaRepository;
import com.petcontrol.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/veterinario")
@RequiredArgsConstructor
@Tag(name = "Veterinario", description = "Endpoints para veterinarios")
@SecurityRequirement(name = "bearer-jwt")
public class VeterinarioController {

    private final MascotaRepository mascotaRepository;
    private final UsuarioRepository usuarioRepository;

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
        MascotaResponse response = new MascotaResponse();
        response.setId(mascota.getId());
        response.setNombre(mascota.getNombre());
        response.setEspecie(mascota.getEspecie());
        response.setRaza(mascota.getRaza());
        response.setEdad(mascota.getEdad());
        response.setColor(mascota.getColor());
        response.setPeso(mascota.getPeso());
        response.setFechaRegistro(mascota.getFechaRegistro());
        response.setUsuarioEmail(mascota.getUsuario().getEmail());
        response.setUsuarioNombre(mascota.getUsuario().getNombre());
        return response;
    }
}