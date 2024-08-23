package com.subway.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.subway.domain.Board;
import com.subway.service.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardService bs;

	// 게시판 출력(GET)
	@GetMapping("/board")
	public ResponseEntity<?> getBoard(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@RequestParam(name = "sno") int station_no) {
		return ResponseEntity.ok(bs.getBoards(pageable, station_no));
	}

	// 게시판 글 조회(GET)
	@GetMapping("/board/view")
	public ResponseEntity<?> viewBoard(@RequestParam(name = "idx") int idx) {
		return ResponseEntity.ok(bs.viewBoards(idx));
	}
	
	// 게시판 게시글 유저 검증용 메서드
	@PostMapping("/checkUser")
	public ResponseEntity<?> checkUser(@RequestParam(name = "idx") int idx) {
		return ResponseEntity.status(bs.checkUser(idx)).body(null);
	}

	// 게시판 게시글 찾기
	@GetMapping("/board/search")
	public ResponseEntity<?> findBoard(
			@PageableDefault(page = 0, size = 5, sort = "idx", direction = Sort.Direction.DESC) Pageable pageable,
			@RequestParam(name = "searchType") String type, @RequestParam(name = "keyword") String keyword, @RequestParam(name = "sno") int station_no) {
		return ResponseEntity.ok(bs.findBoards(pageable, type, keyword, station_no));
	}

	// 게시판에 글 쓰기(POST)
	@PostMapping("/write")
	public ResponseEntity<?> writeBoard(@RequestParam(name = "sno", defaultValue = "95") int station_no,
			@RequestBody Board board) {
		try {
			bs.saveBoard(station_no, board);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글쓰기 실패");
		}
		return ResponseEntity.ok("글쓰기 성공");
	}

	// 게시판에 글 수정하기(POST)
	@PostMapping("/edit")
	public ResponseEntity<?> editBoard(
			@RequestBody Board board, @RequestParam(name = "idx") int idx) {
		try {
			int x = bs.editBoard(board, idx);
			return ResponseEntity.status(x).body("");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글수정 실패");
		}
	}

	// 게시판 글 지우기(POST)
	@PostMapping("/delete")
	public ResponseEntity<?> deleteBoard(@RequestParam(name = "idx") int idx) {
		return ResponseEntity.ok(bs.deleteBoard(idx));
	}

}
