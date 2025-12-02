package com.petcontrol.service;

import com.petcontrol.model.Usuario;
import com.petcontrol.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Elimina un usuario SOLO si es rol CLIENTE. Lanza error si no existe o si no es cliente.
     * Cascade en Usuario.mascotas elimina mascotas asociadas; las recetas/vacunas deben estar con FK en DB.
     */
    public void eliminarClientePorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (usuario.getRol() != Usuario.Rol.CLIENTE) {
            throw new RuntimeException("Solo se pueden eliminar perfiles de CLIENTE");
        }
        usuarioRepository.delete(usuario);
    }
}
