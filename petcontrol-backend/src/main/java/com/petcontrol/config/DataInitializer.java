package com.petcontrol.config;

import com.petcontrol.model.Usuario;
import com.petcontrol.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Crear usuario ADMIN si no existe
        if (!usuarioRepository.existsByEmail("admin@admin.cl")) {
            Usuario admin = new Usuario();
            admin.setEmail("admin@admin.cl");
            admin.setPassword(passwordEncoder.encode("admin.123"));
            admin.setNombre("Administrador del Sistema");
            admin.setRol(Usuario.Rol.ADMIN);
            usuarioRepository.save(admin);
            log.info("✅ Usuario ADMIN creado: admin@admin.cl / admin.123");
        }

        // Crear usuario VETERINARIO si no existe
        if (!usuarioRepository.existsByEmail("veterinario@petcontrol.cl")) {
            Usuario veterinario = new Usuario();
            veterinario.setEmail("veterinario@petcontrol.cl");
            veterinario.setPassword(passwordEncoder.encode("vet.123"));
            veterinario.setNombre("Dr. Juan Pérez");
            veterinario.setRol(Usuario.Rol.VETERINARIO);
            usuarioRepository.save(veterinario);
            log.info("✅ Usuario VETERINARIO creado: veterinario@petcontrol.cl / vet.123");
        }

        // Crear usuario CLIENTE si no existe
        if (!usuarioRepository.existsByEmail("cliente@petcontrol.cl")) {
            Usuario cliente = new Usuario();
            cliente.setEmail("cliente@petcontrol.cl");
            cliente.setPassword(passwordEncoder.encode("cliente.123"));
            cliente.setNombre("María González");
            cliente.setRol(Usuario.Rol.CLIENTE);
            usuarioRepository.save(cliente);
            log.info("✅ Usuario CLIENTE creado: cliente@petcontrol.cl / cliente.123");
        }

        log.info("========================================");
        log.info("🐾 USUARIOS DE PRUEBA DISPONIBLES:");
        log.info("========================================");
        log.info("👤 ADMIN: admin@admin.cl / admin.123");
        log.info("👨‍⚕️ VETERINARIO: veterinario@petcontrol.cl / vet.123");
        log.info("👥 CLIENTE: cliente@petcontrol.cl / cliente.123");
        log.info("========================================");
    }
}