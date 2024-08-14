package com.subway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.subway.domain.dto.RequestStationDataDTO;
import com.subway.service.StationService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StationController {
	
	private final StationService ss;
	
	@PostMapping("/subway/date")
	public ResponseEntity<?> getStationDataDate(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationDataByDate(dto));
	}
	
	@PostMapping("/subway/hour")
	public ResponseEntity<?> getStationDataHour(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationDataByHours(dto));
	}
	
	@PostMapping("/subway/month")
	public ResponseEntity<?> getStationDataMonth(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationMonthTotalCount(dto));
	}
	
	@PostMapping("/subway/week")
	public ResponseEntity<?> getStationDataWeek(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationWeekTotalCount(dto));
	}
	
	@PostMapping("/subway/all")
	public ResponseEntity<?> getStationDataAll(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationAllTotalCount(dto));
	}
}
