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
    
    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail().toLowerCase().trim());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre() != null ? request.getNombre() : "");
        usuario.setRol(Usuario.Rol.CLIENTE);
        
        usuario = usuarioRepository.save(usuario);
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails, usuario.getRol().name());
        
        return new AuthResponse(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name(), usuario.getId());
    }
    
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );
        
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails, usuario.getRol().name());
        
        return new AuthResponse(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name(), usuario.getId());
    }
}