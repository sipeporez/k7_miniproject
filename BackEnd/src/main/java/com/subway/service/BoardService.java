package com.subway.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.subway.domain.Board;
import com.subway.domain.BoardDTO;
import com.subway.persistence.BoardRepository;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	
	private final BoardRepository br;
	private final MemberRepository mr;

	// 프론트에서 토큰을 통해 멤버객체 조회 및 생성
	public String getUserIDFromToken() {
		String userid = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) userid = authentication.getName();
		else return null;
		
		return userid;
	}
	
	// 모든 보드 목록 조회
	public Page<BoardDTO> getBoards(Pageable pageable, int station_no) {
		return br.getBoards(pageable, station_no);
	}
	// 게시글 조회
	public BoardDTO viewBoards(int station_no, int idx) {
		return br.viewBoards(station_no, idx);
	}
	// 닉네임으로 게시글 조회
	public Page<BoardDTO> getBoardsByNickname(Pageable pageable, String nickname){
		return br.getBoardsByNickname(pageable, nickname);
	}
	// 제목으로 게시글 조회
	public Page<BoardDTO> getBoardsByTitle(Pageable pageable, String title){
		return br.getBoardsByTitle(pageable, title);
	}
	// 내용으로 게시글 조회
	public Page<BoardDTO> getBoardsByContent(Pageable pageable, String content){
		return br.getBoardsByContent(pageable, content);
	}

	// 보드에 게시글 저장
	public Page<BoardDTO> saveBoard(Pageable pageable, int station_no, Board b) {
		br.save(Board.builder()
				.title(b.getTitle())
				.content(b.getContent())
				.member(mr.findById(getUserIDFromToken()).get())
				.createDate(new Date())
				.station_no(station_no)
				.build());
		return br.getBoards(pageable, station_no);
	}
	
	// 보드 게시글 수정
	public Page<BoardDTO> editBoard(Pageable pageable, Board b, int idx) {
		
		Optional<Board> board = br.findById(idx);
		if (board.isPresent() && getUserIDFromToken() != null) { 
			br.save(Board.builder()
					.title(board.get().getTitle())
					.content(board.get().getContent())
					.member(board.get().getMember())
					.createDate(board.get().getCreateDate())
					.station_no(board.get().getStation_no())
					.build());
		return br.getBoards(pageable, b.getStation_no());
		}
		else return null;
	}
	
	// userid와 글 번호로 게시글 삭제
	@Transactional
	public int deleteBoard(int idx) {
		return br.deleteBoardByUserID(getUserIDFromToken(), idx);
	}


}
