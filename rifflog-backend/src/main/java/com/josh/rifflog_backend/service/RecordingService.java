package com.josh.rifflog_backend.service;

import com.josh.rifflog_backend.dto.RecordingRequestDTO;
import com.josh.rifflog_backend.dto.RecordingResponseDTO;
import com.josh.rifflog_backend.model.Recording;
import com.josh.rifflog_backend.repository.RecordingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordingService {

    private final RecordingRepository recordingRepository;

    public RecordingService(RecordingRepository recordingRepository) {
        this.recordingRepository = recordingRepository;
    }

    public List<RecordingResponseDTO> getAllRecordings() {
        List<Recording> recordings = recordingRepository.findAllByOrderByRecordedAtDesc();
        return recordings.stream()
                .map(recording -> convertToResponseDTO(recording))
                .toList();
    }

    public RecordingResponseDTO getRecordingById(Long id) throws RuntimeException {
        Recording recording = recordingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recording not found"));
        return convertToResponseDTO(recording);
    }

    public RecordingResponseDTO createRecording(RecordingRequestDTO recordingRequest) {
        Recording newRecording = new Recording();
        newRecording.setTitle(recordingRequest.getTitle());
        newRecording.setRecordedAt(recordingRequest.getRecordedAt());
        newRecording.setCloudinaryPublicId(recordingRequest.getCloudinaryPublicId());
        newRecording.setVideoUrl(recordingRequest.getVideoUrl());
        newRecording.setMediaType(recordingRequest.getMediaType());
        newRecording.setDuration(recordingRequest.getDuration());
        newRecording.setAudioUrl(recordingRequest.getAudioUrl());
        newRecording.setNotes(recordingRequest.getNotes());
        newRecording.setGearUsed(recordingRequest.getGearUsed());
        newRecording.setTags(recordingRequest.getTags());
        return convertToResponseDTO(recordingRepository.save(newRecording));
    }

    public RecordingResponseDTO updateRecording(Long id, RecordingRequestDTO recordingRequest) {
        Recording recording = recordingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recording not found"));
        recording.setTitle(recordingRequest.getTitle());
        recording.setRecordedAt(recordingRequest.getRecordedAt());
        recording.setCloudinaryPublicId(recordingRequest.getCloudinaryPublicId());
        recording.setVideoUrl(recordingRequest.getVideoUrl());
        recording.setMediaType(recordingRequest.getMediaType());
        recording.setDuration(recordingRequest.getDuration());
        recording.setAudioUrl(recordingRequest.getAudioUrl());
        recording.setNotes(recordingRequest.getNotes());
        recording.setGearUsed(recordingRequest.getGearUsed());
        recording.setTags(recordingRequest.getTags());
        return convertToResponseDTO(recordingRepository.save(recording));
    }

    public void deleteRecording(Long id) throws RuntimeException {
        Recording recording = recordingRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Recording not found"));
        recordingRepository.delete(recording);
    }

    private RecordingResponseDTO convertToResponseDTO(Recording recording) {
        RecordingResponseDTO responseDTO = new RecordingResponseDTO();
        responseDTO.setId(recording.getId());
        responseDTO.setCreatedAt(recording.getCreatedAt());
        responseDTO.setTitle(recording.getTitle());
        responseDTO.setRecordedAt(recording.getRecordedAt());
        responseDTO.setMediaType(recording.getMediaType());
        responseDTO.setAudioUrl(recording.getAudioUrl());
        responseDTO.setVideoUrl(recording.getVideoUrl());
        responseDTO.setGearUsed(recording.getGearUsed());
        responseDTO.setNotes(recording.getNotes());
        responseDTO.setTags(recording.getTags());
        responseDTO.setDuration(recording.getDuration());
        return responseDTO;
    }

}
