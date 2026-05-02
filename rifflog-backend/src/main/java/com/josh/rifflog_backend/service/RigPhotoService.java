package com.josh.rifflog_backend.service;

import com.josh.rifflog_backend.dto.RigPhotoRequestDTO;
import com.josh.rifflog_backend.dto.RigPhotoResponseDTO;
import com.josh.rifflog_backend.exception.ResourceNotFoundException;
import com.josh.rifflog_backend.model.RigPhoto;
import com.josh.rifflog_backend.repository.RigPhotoRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class RigPhotoService {

    private final RigPhotoRepository rigPhotoRepository;
    private final CloudinaryService cloudinaryService;

    public RigPhotoService(RigPhotoRepository rigPhotoRepository, CloudinaryService cloudinaryService) {
        this.rigPhotoRepository = rigPhotoRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<RigPhotoResponseDTO> getAllRigPhotos() {
        List<RigPhoto> rigPhotos = rigPhotoRepository.findAllByOrderByCreatedAtDesc();
        return rigPhotos.stream()
                .map(rigPhoto -> convertToResponseDTO(rigPhoto))
                .toList();
    }

    public RigPhotoResponseDTO createRigPhoto(RigPhotoRequestDTO rigPhotoRequestDTO) {
        RigPhoto newRigPhoto = new RigPhoto();
        newRigPhoto.setCategory(rigPhotoRequestDTO.getCategory());
        newRigPhoto.setCloudinaryPublicId(rigPhotoRequestDTO.getCloudinaryPublicId());
        newRigPhoto.setDescription(rigPhotoRequestDTO.getDescription());
        newRigPhoto.setImageUrl(rigPhotoRequestDTO.getImageUrl());
        return convertToResponseDTO(rigPhotoRepository.save(newRigPhoto));
    }

    public RigPhotoResponseDTO updateRigPhoto(Long id, RigPhotoRequestDTO rigPhotoRequestDTO) {
        RigPhoto rigPhoto = rigPhotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RigPhoto not found with id: " + id));
        if (rigPhotoRequestDTO.getDescription() != null) {
            rigPhoto.setDescription(rigPhotoRequestDTO.getDescription());
        }
        if (rigPhotoRequestDTO.getImageUrl() != null) {
            rigPhoto.setImageUrl(rigPhotoRequestDTO.getImageUrl());
        }
        if (rigPhotoRequestDTO.getCategory() != null) {
            rigPhoto.setCategory(rigPhotoRequestDTO.getCategory());
        }
        if (rigPhotoRequestDTO.getCloudinaryPublicId() != null) {
            rigPhoto.setCloudinaryPublicId(rigPhotoRequestDTO.getCloudinaryPublicId());
        }
        return convertToResponseDTO(rigPhotoRepository.save(rigPhoto));
    }

    public void deleteRigPhoto(Long id) throws RuntimeException, IOException {
        RigPhoto rigPhoto = rigPhotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RigPhoto Not Found"));
        if (rigPhoto.getCloudinaryPublicId() != null) {
            cloudinaryService.deleteFile(rigPhoto.getCloudinaryPublicId());
        }
        rigPhotoRepository.delete(rigPhoto);
    }

    private RigPhotoResponseDTO convertToResponseDTO(RigPhoto rigPhoto) {
        RigPhotoResponseDTO responseDTO = new RigPhotoResponseDTO();
        responseDTO.setCategory(rigPhoto.getCategory());
        responseDTO.setCloudinaryPublicId(rigPhoto.getCloudinaryPublicId());
        responseDTO.setDescription(rigPhoto.getDescription());
        responseDTO.setImageUrl(rigPhoto.getImageUrl());
        responseDTO.setCreatedAt(rigPhoto.getCreatedAt());
        responseDTO.setId(rigPhoto.getId());
        return responseDTO;
    }
}
