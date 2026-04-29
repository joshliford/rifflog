package com.josh.rifflog_backend.dto;

public class RigPhotoRequestDTO {

    private String imageUrl;

    private String cloudinaryPublicId;

    private String description;

    private String category;

    public RigPhotoRequestDTO() {

    }

    public RigPhotoRequestDTO(String imageUrl, String cloudinaryPublicId, String description, String category) {
        this.imageUrl = imageUrl;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.description = description;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
