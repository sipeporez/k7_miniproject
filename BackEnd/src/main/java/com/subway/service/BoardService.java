package com.subway.service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.subway.domain.Board;
import com.subway.domain.Member;
import com.subway.domain.Role;
import com.subway.domain.dto.BoardDTO;
import com.subway.domain.dto.GetBoardDTO;
import com.subway.persistence.BoardRepository;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository br;
	private final MemberRepository mr;

	// 프론트에서 받은 토큰으로 멤버 id 반환
	public String getUserIDFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getName();
		}
		return null;
	}

	// 모든 보드 목록 조회
	public Page<GetBoardDTO> getBoards(Pageable pageable, int station_no) {
		return br.getBoards(pageable, station_no);
	}

	// 게시글 조회
	public BoardDTO viewBoards(int idx) {
		return br.viewBoards(idx);
	}

	// 게시글 조회
	public BoardDTO viewMyBoards(int idx) {
		return br.viewMyBoards(idx);
	}

	// 게시글 찾기
	public Page<GetBoardDTO> findBoards(Pageable pageable, String type, String keyword) {
		if (type.equals("nickname"))
			return br.findBoardsByNickname(pageable, keyword);
		else if (type.equals("title"))
			return br.findBoardsByTitle(pageable, keyword);
		else if (type.equals("content"))
			return br.findBoardsByContent(pageable, keyword);
		else
			return null;
	}

	// 보드에 게시글 저장
	public void saveBoard(int station_no, Board b) {
		String userid = getUserIDFromToken();
		br.save(Board.builder().title(b.getTitle()).content(b.getContent()).member(mr.findById(userid).get())
				.createDate(new Date()).station_no(station_no).build());
	}

	// 보드 게시글 수정
	public int editBoard(Board b, int idx) {
		Optional<Board> board = br.findById(idx);
		String userid = board.get().getMember().getUserid();
		if (!userid.equals(getUserIDFromToken()))
			return HttpStatus.UNAUTHORIZED.value();
		if (board.isPresent()) {
			Board bd = board.get();
			bd.setContent(b.getContent());
			bd.setTitle(b.getTitle());
			br.save(bd);
			return HttpStatus.OK.value();
		} else
			return HttpStatus.INTERNAL_SERVER_ERROR.value();
	}

	// 유저 검증용 메서드
	public int checkUser(int idx) {
		try {
			Optional<Board> board = br.findById(idx);
			String userid = board.get().getMember().getUserid();
			Optional<Member> member = mr.findById(getUserIDFromToken());
			Role role = member.get().getRole();

			if ((board.isPresent() && userid.equals(getUserIDFromToken())) || role == Role.ROLE_ADMIN) {
				return HttpStatus.OK.value();
			} else
				return HttpStatus.UNAUTHORIZED.value();
		} catch (NoSuchElementException e) {
			return HttpStatus.UNAUTHORIZED.value();
		}

	}

	// userid와 글 번호로 게시글 삭제
	@Transactional
	public int deleteBoard(int idx) {
		Optional<Board> board = br.findById(idx);
		String userid = board.get().getMember().getUserid();
		Optional<Member> member = mr.findById(getUserIDFromToken());
		Role role = member.get().getRole();

		if ((board.isPresent() && userid.equals(getUserIDFromToken())) || role == Role.ROLE_ADMIN) {
			br.deleteBoardByUserID(userid, idx);
		} else
			return 0;
		return 1;
	}

}
