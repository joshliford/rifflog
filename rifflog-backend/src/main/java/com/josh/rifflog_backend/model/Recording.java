package com.josh.rifflog_backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "recordings")
public class Recording {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private LocalDate recordedAt;

    // Cloudinary url
    private String audioUrl;

    // Cloudinary url
    private String videoUrl;

    // audio, video, or both
    @Enumerated(EnumType.STRING)
    private MediaType mediaType;

    // for deletion
    private String cloudinaryPublicId;

    // in seconds
    private Integer duration;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // guitar, amp sim, etc.
    private String gearUsed;

    // blues, metal, electric, etc.
    private String tags;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Recording() {

    }

    public Recording(String audioUrl, String cloudinaryPublicId, Integer duration, String gearUsed, Long id, MediaType mediaType, String notes, LocalDate recordedAt, String tags, String title, String videoUrl) {
        this.audioUrl = audioUrl;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.duration = duration;
        this.gearUsed = gearUsed;
        this.id = id;
        this.mediaType = mediaType;
        this.notes = notes;
        this.recordedAt = recordedAt;
        this.tags = tags;
        this.title = title;
        this.videoUrl = videoUrl;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getGearUsed() {
        return gearUsed;
    }

    public void setGearUsed(String gearUsed) {
        this.gearUsed = gearUsed;
    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public void setMediaType(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDate recordedAt) {
        this.recordedAt = recordedAt;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
