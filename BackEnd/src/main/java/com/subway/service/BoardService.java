package com.subway.service;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.subway.domain.Board;
import com.subway.domain.BoardDTO;
import com.subway.domain.Member;
import com.subway.persistence.BoardRepository;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository br;
	private final MemberRepository mr;

	// 모든 보드 목록 조회
	public Page<Board> getBoards(Pageable pageable) {
		return br.getBoards(pageable);
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

	public Page<Board> saveBoard(Pageable pageable, Board b) {
		// 프론트에서 토큰을 통해 멤버객체 조회 및 생성
		String userid = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) 
			userid = authentication.getName();
		else return null;
		
		br.save(Board.builder()
				.title(b.getTitle())
				.content(b.getContent())
				.nickname(b.getNickname())
				.member(mr.findById(userid).get())
				.createDate(new Date())
				.build());

		return br.getBoards(pageable);
	}


}
