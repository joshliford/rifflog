package com.josh.rifflog_backend.controller;

import com.josh.rifflog_backend.dto.RigPhotoRequestDTO;
import com.josh.rifflog_backend.dto.RigPhotoResponseDTO;
import com.josh.rifflog_backend.service.RigPhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/rig")
public class RigPhotoController {

    private final RigPhotoService rigPhotoService;

    public RigPhotoController(RigPhotoService rigPhotoService) {
        this.rigPhotoService = rigPhotoService;
    }

    @GetMapping
    public ResponseEntity<List<RigPhotoResponseDTO>> getAllRigPhotos() {
        List<RigPhotoResponseDTO> rigPhotos = rigPhotoService.getAllRigPhotos();
        return ResponseEntity.ok(rigPhotos);
    }

    @PostMapping
    public ResponseEntity<RigPhotoResponseDTO> createRigPhoto(@RequestBody RigPhotoRequestDTO rigPhotoRequestDTO) {
        RigPhotoResponseDTO rigPhoto = rigPhotoService.createRigPhoto(rigPhotoRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(rigPhoto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RigPhotoResponseDTO> updateRigPhoto(@PathVariable Long id, @RequestBody RigPhotoRequestDTO rigPhotoRequestDTO) {
        RigPhotoResponseDTO rigPhoto = rigPhotoService.updateRigPhoto(id, rigPhotoRequestDTO);
        return ResponseEntity.ok(rigPhoto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRigPhoto(@PathVariable Long id) throws IOException {
        rigPhotoService.deleteRigPhoto(id);
        return ResponseEntity.noContent().build();
    }

}
