package com.subway.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.subway.domain.Member;
import com.subway.domain.Role;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final MemberRepository mr;
	private final PasswordEncoder enc;

	// 프론트에서 받은 토큰으로 멤버 id 반환
	public String getUserIDFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getName();
		}
		return null;
	}

	// 회원가입
	public void signup(Member m) {
		mr.save(Member.builder()
				.userid(m.getUserid())
				.password(enc.encode(m.getPassword()))
				.nickname(m.getNickname())
				.role(Role.ROLE_MEMBER).build());
	}

	// 중복 아이디 체크
	public ResponseEntity<?> checkID(Member m) {
		if (mr.findById(m.getUserid()).isPresent())
			return ResponseEntity.status(HttpStatus.CONFLICT).body("중복된 ID");
		else
			return ResponseEntity.ok("사용 가능한 ID");
	}

	// OAuth2.0 로그인시 유저 검증
	public ResponseEntity<?> checkOAuth() {
		String userid = getUserIDFromToken();
		Optional<Member> mem = mr.findById(userid);
		String password = mem.get().getPassword();
		if (enc.matches("1a2s1a2s3d4f3d4f", password)) return ResponseEntity.accepted().body("");
		else return ResponseEntity.status(HttpStatus.CONFLICT).body("");
	}

}
