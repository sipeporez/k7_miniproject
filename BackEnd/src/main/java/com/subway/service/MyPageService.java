package com.subway.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.subway.domain.Member;
import com.subway.domain.dto.GetBoardDTO;
import com.subway.persistence.BoardRepository;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageService {
	private final MemberRepository mr;
	private final PasswordEncoder enc;
	private final BoardRepository br;

	// 프론트에서 받은 토큰으로 멤버 id 반환
	public String getUserIDFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		 if (authentication != null && authentication.isAuthenticated()) {
		        return authentication.getName();
		    }
		 return null;
	}

	// 회원정보 조회
	public Member getMember() {
		Member m = mr.findById(getUserIDFromToken()).orElseThrow();
		return Member.builder()
				.userid(m.getUserid())
				.nickname(m.getNickname())
				.regidate(m.getRegidate())
				.role(m.getRole())
				.build();
	}
	
	// 비밀번호 수정
	public boolean changePassword(Member mem) {
		try {
			Member m = mr.findById(getUserIDFromToken()).orElseThrow();
			m.setPassword(enc.encode(mem.getPassword()));
			mr.save(m); 
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	// 닉네임 수정
	public boolean changeNickname(Member mem) {
		try {
			Member m = mr.findById(getUserIDFromToken()).orElseThrow();
			m.setNickname(mem.getNickname());
			mr.save(m);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	// 회원 탈퇴
	public boolean deleteAccount(Member mem) {
		try {
			Member m = mr.findById(getUserIDFromToken()).orElseThrow();
			if (enc.matches(mem.getPassword(), m.getPassword())) {
				mr.delete(m);
				return true;
			}
		}catch (Exception e) {
			return false;
		}
		return false;
	}

	// 내가 쓴 게시글 조회
	public Page<GetBoardDTO> getMyBoards(Pageable pageable) {
		return br.getMyBoards(pageable, getUserIDFromToken());
	}
}
