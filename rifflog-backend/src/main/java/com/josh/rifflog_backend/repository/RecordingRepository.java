package com.josh.rifflog_backend.repository;

import com.josh.rifflog_backend.model.Recording;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordingRepository extends JpaRepository<Recording, Long> {
    List<Recording> findAllByOrderByRecordedAtDesc();
}
