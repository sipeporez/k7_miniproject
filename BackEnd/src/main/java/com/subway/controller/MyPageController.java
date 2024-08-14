package com.subway.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.subway.domain.Member;
import com.subway.service.MyPageService;
import com.subway.service.RandomNicknameService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MyPageController {
	private final MyPageService ms;
	private final RandomNicknameService rns;
	
	// 회원정보 조회
	@GetMapping("/mypage/info")
	public ResponseEntity<?> mypage() {
		return ResponseEntity.ok(ms.getMember());
	}
	// 비밀번호 검증
	@PostMapping("/mypage/checkpw")
	public ResponseEntity<?> checkPassword(@RequestBody Member member) {
		boolean flag = ms.checkPW(member);
		return flag ? ResponseEntity.ok("비밀번호 검증 성공")
				: ResponseEntity.badRequest().body("비밀번호 검증 실패");
	}
	
	// 비밀번호 변경
	@PostMapping("/mypage/changepw")
	public ResponseEntity<?> changePassword(@RequestBody Member member) {
		boolean flag = ms.changePassword(member);
		return flag ? ResponseEntity.ok("비밀번호 수정 성공")
				: ResponseEntity.badRequest().body("비밀번호 수정 실패");
	}
	// 닉네임 변경
	@PostMapping("/mypage/changenick")
	public ResponseEntity<?> changeNickname(@RequestBody Member member) {
		boolean flag = ms.changeNickname(member);
		return flag ? ResponseEntity.ok("닉네임 수정 성공")
				: ResponseEntity.badRequest().body("닉네임 수정 실패");
	}
	// 랜덤 닉네임 생성
	@GetMapping("/mypage/randomnick")
	public ResponseEntity<?> randomNickname() throws Exception {
		return ResponseEntity.ok(rns.makeRandomNickname());
	}
	
	// 회원 탈퇴 (비밀번호 재입력)
	@GetMapping("/mypage/removeacc")
	public ResponseEntity<?> removeAcc() {
		boolean flag = ms.deleteAccount();
		return flag ? ResponseEntity.ok("회원 탈퇴 완료")
				: ResponseEntity.badRequest().body("회원 탈퇴 실패");
	}
	
	// 내가 쓴 게시글 조회
	@GetMapping("/mypage/boardlist")
	public ResponseEntity<?> getMyBoard(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable) {
		return ResponseEntity.ok(ms.getMyBoards(pageable));
	}
}
