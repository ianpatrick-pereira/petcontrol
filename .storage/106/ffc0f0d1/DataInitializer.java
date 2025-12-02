package com.petcontrol.config;

import com.petcontrol.model.Usuario;
import com.petcontrol.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        if (!usuarioRepository.existsByEmail("admin@admin.cl")) {
            Usuario admin = new Usuario();
            admin.setEmail("admin@admin.cl");
            admin.setPassword(passwordEncoder.encode("admin.123"));
            admin.setNombre("Administrador");
            admin.setRol(Usuario.Rol.ADMIN);
            usuarioRepository.save(admin);
            System.out.println("✅ Usuario administrador creado: admin@admin.cl / admin.123");
        }
    }
}