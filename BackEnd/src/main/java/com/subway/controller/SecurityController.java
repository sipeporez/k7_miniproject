package com.subway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SecurityController {
		
	@GetMapping({"/", "/index"})
	public String index() {
		return "index";
	}
	
}
