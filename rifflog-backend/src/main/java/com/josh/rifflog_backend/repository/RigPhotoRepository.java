package com.josh.rifflog_backend.repository;

import com.josh.rifflog_backend.model.RigPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RigPhotoRepository extends JpaRepository<RigPhoto, Long> {
    List<RigPhoto> findAllByOrderByCreatedAtDesc();
}
