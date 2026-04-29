package com.josh.rifflog_backend.dto;

import java.time.LocalDateTime;

public class RigPhotoResponseDTO {

    private Long id;

    private String imageUrl;

    private String cloudinaryPublicId;

    private String description;

    private String category;

    private LocalDateTime createdAt;

    public RigPhotoResponseDTO() {

    }

    public RigPhotoResponseDTO(Long id, String imageUrl, String cloudinaryPublicId, String description, LocalDateTime createdAt, String category) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.description = description;
        this.createdAt = createdAt;
        this.category = category;
    }

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
