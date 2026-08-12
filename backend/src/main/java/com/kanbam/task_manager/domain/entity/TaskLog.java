package com.kanbam.task_manager.domain.entity;

import com.kanbam.task_manager.domain.enums.StatusEnum;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "task_logs")
public class TaskLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long taskId;

    @Column(nullable = false, length = 150)
    private String tituloTarefa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusEnum statusAnterior;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusEnum statusNovo;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    public TaskLog() {
    }

    public TaskLog(
            Long taskId,
            String tituloTarefa,
            StatusEnum statusAnterior,
            StatusEnum statusNovo
    ) {
        this.taskId = taskId;
        this.tituloTarefa = tituloTarefa;
        this.statusAnterior = statusAnterior;
        this.statusNovo = statusNovo;
        this.dataHora = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public String getTituloTarefa() {
        return tituloTarefa;
    }

    public StatusEnum getStatusAnterior() {
        return statusAnterior;
    }

    public StatusEnum getStatusNovo() {
        return statusNovo;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }
}