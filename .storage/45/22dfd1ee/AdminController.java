package com.petcontrol.controller;

import com.petcontrol.dto.MascotaResponse;
import com.petcontrol.service.MascotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Administración", description = "Endpoints exclusivos para administradores")
public class AdminController {
    
    @Autowired
    private MascotaService mascotaService;
    
    @GetMapping("/mascotas")
    @Operation(summary = "Obtener todas las mascotas", description = "Lista todas las mascotas del sistema (solo admin)")
    public ResponseEntity<List<MascotaResponse>> obtenerTodasLasMascotas() {
        List<MascotaResponse> mascotas = mascotaService.obtenerTodasLasMascotas();
        return ResponseEntity.ok(mascotas);
    }
}