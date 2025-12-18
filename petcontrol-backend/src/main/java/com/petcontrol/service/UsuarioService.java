package com.petcontrol.service;

import com.petcontrol.model.Usuario;
import com.petcontrol.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Emails protegidos que no pueden ser eliminados
    private static final List<String> PROTECTED_EMAILS = Arrays.asList(
        "admin@admin.cl",
        "veterinario@petcontrol.cl"
    );
    
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email.toLowerCase().trim());
    }
    
    public Usuario createUsuario(Usuario usuario) {
        // Verificar si el email es protegido
        if (PROTECTED_EMAILS.contains(usuario.getEmail().toLowerCase().trim())) {
            throw new RuntimeException("No se puede crear un usuario con este email protegido");
        }
        
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        return usuarioRepository.save(usuario);
    }
    
    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // No permitir cambiar a un email protegido
        if (!usuario.getEmail().equals(usuarioDetails.getEmail()) && 
            PROTECTED_EMAILS.contains(usuarioDetails.getEmail().toLowerCase().trim())) {
            throw new RuntimeException("No se puede cambiar a un email protegido");
        }
        
        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        usuario.setRol(usuarioDetails.getRol());
        
        return usuarioRepository.save(usuario);
    }
    
    public void deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Verificar si el usuario tiene un email protegido - NO permitir eliminación
        if (PROTECTED_EMAILS.contains(usuario.getEmail().toLowerCase().trim())) {
            throw new RuntimeException("No se puede eliminar este usuario. Es un usuario protegido del sistema.");
        }
        
        usuarioRepository.deleteById(id);
    }
    
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email.toLowerCase().trim());
    }
}