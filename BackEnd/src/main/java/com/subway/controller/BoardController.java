package com.subway.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.subway.domain.Board;
import com.subway.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class BoardController {

	private final BoardService bs;

	// 게시판 출력(GET)
	@GetMapping("/board")
	public ResponseEntity<?> getBoard(@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC)
	Pageable pageable,@RequestParam(name = "sno", defaultValue = "95") int station_no) {
		log.info("getBoard: All");
		return ResponseEntity.ok(bs.getBoards(pageable, station_no));
	}
	
	// 게시판 글 조회(GET)
	@GetMapping("/board/view")
	public ResponseEntity<?> viewBoard(
			@RequestParam(name = "sno", defaultValue = "95") int station_no,
			@RequestParam(name = "idx", defaultValue = "4") int idx) {
		log.info("getBoard: All");
		return ResponseEntity.ok(bs.viewBoards(station_no, idx));
	}
	
	// 게시판 닉네임으로 게시글 찾기
	@GetMapping("/board/nick/{nickname}")
	public ResponseEntity<?> getBoardNick(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@PathVariable String nickname) {
		return ResponseEntity.ok(bs.getBoardsByNickname(pageable, nickname));
	}
	
	// 게시판 글 제목으로 게시글 찾기
	@GetMapping("/board/title/{title}")
	public ResponseEntity<?> getBoardTitle(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@PathVariable String title) {
		return ResponseEntity.ok(bs.getBoardsByTitle(pageable, title));
	}
	
	// 게시판 글 내용으로 게시글 찾기
	@GetMapping("/board/content/{content}")
	public ResponseEntity<?> getBoardContent(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@PathVariable String content) {
		return ResponseEntity.ok(bs.getBoardsByContent(pageable, content));
	}
	
	// 게시판에 글 쓰기(POST)
	@PostMapping("/write")
	public ResponseEntity<?> writeBoard(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@RequestParam(name = "sno", defaultValue = "95") int station_no,
			@RequestBody Board board) {
		log.info("postBoard: Test Data");
		return ResponseEntity.ok(bs.saveBoard(pageable, station_no, board));
	}
	
	// 게시판에 글 수정하기(POST)
	@PostMapping("/edit")
	public ResponseEntity<?> editBoard(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@RequestBody Board board,
			@PathVariable int idx) {
		log.info("postBoard: Test Data");
		return ResponseEntity.ok(bs.editBoard(pageable, board, idx));
	}
	
	// 게시판 글 지우기(POST)
	@PostMapping("/delete")
	public ResponseEntity<?> deleteBoard(
			@RequestParam(name="idx") int idx) {
		log.info("deleteBoard: Test Data");
		return ResponseEntity.ok(bs.deleteBoard(idx));
	}

}
