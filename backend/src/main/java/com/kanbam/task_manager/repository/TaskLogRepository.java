package com.kanbam.task_manager.repository;

import com.kanbam.task_manager.domain.entity.TaskLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskLogRepository extends JpaRepository<TaskLog, Long> {

    List<TaskLog> findAllByOrderByDataHoraDesc();
}