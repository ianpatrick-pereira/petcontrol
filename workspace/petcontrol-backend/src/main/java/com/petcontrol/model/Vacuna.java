package com.petcontrol.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "vacunas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vacuna {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "mascota_id", nullable = false)
    private Mascota mascota;
    
    @Column(nullable = false)
    private String nombreVacuna;
    
    @Column(nullable = false)
    private LocalDate fechaAplicacion;
    
    private LocalDate proximaDosis;
    
    private String lote;
    
    private String veterinarioResponsable;
    
    @Column(length = 500)
    private String observaciones;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}
