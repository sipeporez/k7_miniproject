package com.subway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.subway.domain.Member;
import com.subway.service.LoginService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LoginController {
	
	private final LoginService ls;
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody Member m) {
		try {
			ls.signup(m);
			return ResponseEntity.ok("가입 성공");
		}
		catch(Exception e) {
			return (ResponseEntity<?>) ResponseEntity.badRequest();
		}
	}
	@PostMapping("/signup/checkid")
	public ResponseEntity<?> checkID(@RequestBody Member m) {
			return ls.checkID(m);
		}
	
	@PostMapping("/login/checkOAuth")
	public ResponseEntity<?> checkOAuth() {
		return ls.checkOAuth();
	}

}
