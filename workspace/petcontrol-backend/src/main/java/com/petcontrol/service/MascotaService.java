package com.petcontrol.service;

import com.petcontrol.dto.MascotaRequest;
import com.petcontrol.dto.MascotaResponse;
import com.petcontrol.model.Mascota;
import com.petcontrol.model.Usuario;
import com.petcontrol.repository.MascotaRepository;
import com.petcontrol.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MascotaService {
    
    @Autowired
    private MascotaRepository mascotaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    private Usuario getUsuarioActual() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    
    public List<MascotaResponse> obtenerMascotasDelUsuario() {
        Usuario usuario = getUsuarioActual();
        return mascotaRepository.findByUsuarioId(usuario.getId())
                .stream()
                .map(MascotaResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<MascotaResponse> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll()
                .stream()
                .map(MascotaResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    public MascotaResponse obtenerMascotaPorId(Long id) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Usuario usuario = getUsuarioActual();
        if (!mascota.getUsuario().getId().equals(usuario.getId()) && 
            !usuario.getRol().equals(Usuario.Rol.ADMIN)) {
            throw new RuntimeException("No tienes permiso para ver esta mascota");
        }
        
        return MascotaResponse.fromEntity(mascota);
    }
    
    public MascotaResponse crearMascota(MascotaRequest request) {
        Usuario usuario = getUsuarioActual();
        
        Mascota mascota = new Mascota();
        mascota.setNombre(request.getNombre());
        mascota.setEspecie(request.getEspecie());
        mascota.setRaza(request.getRaza());
        mascota.setEdad(request.getEdad());
        mascota.setDescripcion(request.getDescripcion());
        mascota.setImagen(request.getImagen());
        mascota.setUsuario(usuario);
        
        mascota = mascotaRepository.save(mascota);
        return MascotaResponse.fromEntity(mascota);
    }
    
    public MascotaResponse actualizarMascota(Long id, MascotaRequest request) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Usuario usuario = getUsuarioActual();
        if (!mascota.getUsuario().getId().equals(usuario.getId()) && 
            !usuario.getRol().equals(Usuario.Rol.ADMIN)) {
            throw new RuntimeException("No tienes permiso para editar esta mascota");
        }
        
        mascota.setNombre(request.getNombre());
        mascota.setEspecie(request.getEspecie());
        mascota.setRaza(request.getRaza());
        mascota.setEdad(request.getEdad());
        mascota.setDescripcion(request.getDescripcion());
        mascota.setImagen(request.getImagen());
        
        mascota = mascotaRepository.save(mascota);
        return MascotaResponse.fromEntity(mascota);
    }
    
    public void eliminarMascota(Long id) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Usuario usuario = getUsuarioActual();
        if (!mascota.getUsuario().getId().equals(usuario.getId()) && 
            !usuario.getRol().equals(Usuario.Rol.ADMIN)) {
            throw new RuntimeException("No tienes permiso para eliminar esta mascota");
        }
        
        mascotaRepository.delete(mascota);
    }
    
    // Métodos exclusivos para ADMIN
    
    public void eliminarMascotaAdmin(Long id) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        mascotaRepository.delete(mascota);
    }
    
    public MascotaResponse obtenerMascotaPorIdAdmin(Long id) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        return MascotaResponse.fromEntity(mascota);
    }
}