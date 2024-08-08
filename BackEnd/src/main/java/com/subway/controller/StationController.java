package com.subway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.subway.domain.dto.RequestStationDataDTO;
import com.subway.service.StationService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StationController {
	
	private final StationService ss;
	
	@GetMapping("/subway")
	public ResponseEntity<?> getStationDataDate(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationDataByDate(dto));
	}
	
	@GetMapping("/subway/hour")
	public ResponseEntity<?> getStationDataHour(@RequestBody RequestStationDataDTO dto) {
		return ResponseEntity.ok(ss.getStationDataByHours(dto));
	}
	

}
