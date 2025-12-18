package com.petcontrol.controller;

import com.petcontrol.dto.MascotaRequest;
import com.petcontrol.dto.MascotaResponse;
import com.petcontrol.service.MascotaService;
import com.petcontrol.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Administración", description = "Endpoints exclusivos para administradores")
public class AdminController {
    
    @Autowired
    private MascotaService mascotaService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/mascotas")
    @Operation(summary = "Obtener todas las mascotas", description = "Lista todas las mascotas del sistema (solo admin)")
    public ResponseEntity<List<MascotaResponse>> obtenerTodasLasMascotas() {
        List<MascotaResponse> mascotas = mascotaService.obtenerTodasLasMascotas();
        return ResponseEntity.ok(mascotas);
    }
    
    @DeleteMapping("/mascotas/{id}")
    @Operation(summary = "Eliminar cualquier mascota", description = "Permite al admin eliminar cualquier mascota del sistema")
    public ResponseEntity<Map<String, String>> eliminarMascota(@PathVariable Long id) {
        try {
            mascotaService.eliminarMascotaAdmin(id);
            Map<String, String> response = new HashMap<>();
            response.put("mensaje", "Mascota eliminada exitosamente");
            response.put("id", id.toString());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/mascotas/{id}")
    @Operation(summary = "Obtener mascota por ID", description = "Ver detalles de cualquier mascota")
    public ResponseEntity<MascotaResponse> obtenerMascotaPorId(@PathVariable Long id) {
        try {
            MascotaResponse mascota = mascotaService.obtenerMascotaPorIdAdmin(id);
            return ResponseEntity.ok(mascota);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/mascotas/{id}")
    @Operation(summary = "Editar cualquier mascota", description = "Permite al admin actualizar datos de una mascota")
    public ResponseEntity<?> editarMascota(@PathVariable Long id, @RequestBody MascotaRequest request) {
        try {
            MascotaResponse actualizada = mascotaService.actualizarMascota(id, request);
            return ResponseEntity.ok(actualizada);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/usuarios/{id}")
    @Operation(summary = "Eliminar perfil de cliente", description = "Elimina un usuario de rol CLIENTE y sus datos asociados")
    public ResponseEntity<Map<String, String>> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarClientePorId(id);
            Map<String, String> resp = new HashMap<>();
            resp.put("mensaje", "Usuario eliminado");
            resp.put("id", id.toString());
            return ResponseEntity.ok(resp);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}