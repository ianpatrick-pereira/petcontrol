package com.petcontrol.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "recetas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Receta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "mascota_id", nullable = false)
    private Mascota mascota;
    
    @Column(nullable = false)
    private String diagnostico;
    
    @Column(nullable = false, length = 1000)
    private String medicamentos;
    
    @Column(length = 500)
    private String dosificacion;
    
    @Column(length = 1000)
    private String indicaciones;
    
    @Column(nullable = false)
    private String veterinario;
    
    @Column(name = "fecha_emision")
    private LocalDateTime fechaEmision;
    
    private Integer diasTratamiento;
    
    @PrePersist
    protected void onCreate() {
        fechaEmision = LocalDateTime.now();
    }
}
