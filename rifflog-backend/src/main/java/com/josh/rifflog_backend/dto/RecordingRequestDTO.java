package com.josh.rifflog_backend.dto;

import com.josh.rifflog_backend.model.MediaType;

import java.time.LocalDate;

public class RecordingRequestDTO {

    private String title;

    // for deletion
    private String cloudinaryPublicId;

    private String tuning;

    private String key;

    private LocalDate recordedAt;

    private MediaType mediaType;

    private String audioUrl;

    private String videoUrl;

    private String gearUsed;

    private String notes;

    private String tags;

    private Integer duration;

    public RecordingRequestDTO() {

    }

    public RecordingRequestDTO(String audioUrl, String cloudinaryPublicId, Integer duration, String gearUsed, MediaType mediaType, String notes, LocalDate recordedAt, String tags, String title, String videoUrl, String tuning,  String key) {
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.duration = duration;
        this.gearUsed = gearUsed;
        this.mediaType = mediaType;
        this.notes = notes;
        this.recordedAt = recordedAt;
        this.tags = tags;
        this.title = title;
        this.videoUrl = videoUrl;
        this.tuning = tuning;
        this.key = key;
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

    public String getCloudinaryPublicId() {
        return cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTuning() {
        return tuning;
    }

    public void setTuning(String tuning) {
        this.tuning = tuning;
    }
}
