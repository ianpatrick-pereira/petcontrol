package com.petcontrol.service;

import com.petcontrol.dto.AuthResponse;
import com.petcontrol.dto.LoginRequest;
import com.petcontrol.dto.RegisterRequest;
import com.petcontrol.model.Usuario;
import com.petcontrol.repository.UsuarioRepository;
import com.petcontrol.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    // Emails protegidos que no pueden ser registrados por usuarios normales
    // PERO SÍ pueden hacer login si ya existen en la base de datos
    private static final List<String> PROTECTED_EMAILS = Arrays.asList(
        "admin@admin.cl",
        "veterinario@petcontrol.cl"
    );
    
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Verificar si es un email protegido - NO permitir registro
        if (PROTECTED_EMAILS.contains(email)) {
            throw new RuntimeException("Este correo está reservado y no puede ser registrado. Si ya tienes una cuenta, inicia sesión.");
        }
        
        // Validar contraseña
        String password = request.getPassword();
        if (password.length() < 8) {
            throw new RuntimeException("La contraseña debe tener al menos 8 caracteres");
        }
        if (!password.matches(".*\\d.*")) {
            throw new RuntimeException("La contraseña debe contener al menos un número");
        }
        if (!password.contains(".")) {
            throw new RuntimeException("La contraseña debe contener al menos un punto (.)");
        }
        
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setNombre(request.getNombre() != null ? request.getNombre() : "");
        usuario.setRol(Usuario.Rol.CLIENTE); // Por defecto siempre CLIENTE
        
        usuario = usuarioRepository.save(usuario);
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails, usuario.getRol().name());
        
        return new AuthResponse(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name(), usuario.getId());
    }
    
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        
        // PERMITIR login para TODOS los usuarios, incluyendo admin y veterinario
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );
        
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails, usuario.getRol().name());
        
        return new AuthResponse(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name(), usuario.getId());
    }
    
    // Método helper para verificar si un email es protegido
    public static boolean isProtectedEmail(String email) {
        return PROTECTED_EMAILS.contains(email.toLowerCase().trim());
    }
}