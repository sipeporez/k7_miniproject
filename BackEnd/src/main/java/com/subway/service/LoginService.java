package com.subway.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	// 회원가입
	public void signup(Member m) {
		mr.save(Member.builder()
				.userid(m.getUserid())
				.password(enc.encode(m.getPassword()))
				.nickname(m.getNickname())
				.role(Role.ROLE_MEMBER)
				.build());
	}

	// 중복 아이디 체크
	public ResponseEntity<?> checkID(Member m) {
		if (mr.findById(m.getUserid()).isPresent())
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("중복된 ID");
		else return ResponseEntity.ok("사용 가능한 ID");
	}

}
