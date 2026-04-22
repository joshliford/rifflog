package com.josh.rifflog_backend.dto;

import com.josh.rifflog_backend.model.MediaType;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RecordingResponseDTO {

    private Long id;

    private LocalDateTime createdAt;

    private String title;

    private LocalDate recordedAt;

    private MediaType mediaType;

    private String audioUrl;

    private String videoUrl;

    private String gearUsed;

    private String notes;

    private String tags;

    private Integer duration;

    public RecordingResponseDTO() {

    }

    public RecordingResponseDTO(Long id, LocalDateTime createdAt, String audioUrl, Integer duration, String gearUsed, MediaType mediaType, String notes, LocalDate recordedAt, String tags, String title, String videoUrl) {
        this.id = id;
        this.createdAt = createdAt;
        this.audioUrl = audioUrl;
        this.duration = duration;
        this.gearUsed = gearUsed;
        this.mediaType = mediaType;
        this.notes = notes;
        this.recordedAt = recordedAt;
        this.tags = tags;
        this.title = title;
        this.videoUrl = videoUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
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
}
