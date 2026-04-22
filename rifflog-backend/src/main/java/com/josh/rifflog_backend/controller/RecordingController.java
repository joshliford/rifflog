package com.josh.rifflog_backend.controller;

import com.josh.rifflog_backend.dto.RecordingRequestDTO;
import com.josh.rifflog_backend.dto.RecordingResponseDTO;
import com.josh.rifflog_backend.service.RecordingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
5 endpoints:
GET /api/recordings (get all recordings)
GET /api/recordings/{id} (get a single recording by id)
POST /api/recordings (create a new recording)
PATCH /api/recordings/{id} (update an existing recording)
DELETE /api/recordings/{id} (delete a single recording by id)
*/

@RestController
@RequestMapping("/api/recordings")
public class RecordingController {

    private final RecordingService recordingService;

    public RecordingController(RecordingService recordingService) {
        this.recordingService = recordingService;
    }

    @GetMapping
    public ResponseEntity<List<RecordingResponseDTO>> getAllRecordings() {
        List<RecordingResponseDTO> recordings = recordingService.getAllRecordings();
        return ResponseEntity.ok(recordings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecordingResponseDTO> getRecordingById(@PathVariable Long id) {
        RecordingResponseDTO recording = recordingService.getRecordingById(id);
        return ResponseEntity.ok(recording);
    }

    @PostMapping
    public ResponseEntity<RecordingResponseDTO> saveRecording(@RequestBody RecordingRequestDTO recordingRequestDTO) {
        RecordingResponseDTO recording = recordingService.createRecording(recordingRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(recording);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RecordingResponseDTO> updateRecording(@PathVariable Long id, @RequestBody RecordingRequestDTO recordingRequestDTO) {
        RecordingResponseDTO recording = recordingService.updateRecording(id, recordingRequestDTO);
        return ResponseEntity.ok(recording);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecording(@PathVariable Long id) {
        recordingService.deleteRecording(id);
        return ResponseEntity.noContent().build();
    }

}
