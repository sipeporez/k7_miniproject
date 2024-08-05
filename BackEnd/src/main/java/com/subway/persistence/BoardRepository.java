package com.subway.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.subway.domain.Board;
import com.subway.domain.BoardDTO;

public interface BoardRepository extends JpaRepository<Board, Integer> {

	@Query("SELECT b.idx, b.title, b.content, b.createDate FROM Board b")
	Page<Board> getBoards(Pageable pageable);

	@Query(value = "SELECT b.idx, b.title, b.nickname, b.content, b.create_Date FROM Board b WHERE MATCH(nickname) AGAINST(:nickname IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<BoardDTO> getBoardsByNickname(Pageable pageable, @Param("nickname") String nickname);

	@Query(value = "SELECT b.idx, b.title, b.nickname, b.content, b.create_Date FROM Board b WHERE MATCH(title) AGAINST(:title IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<BoardDTO> getBoardsByTitle(Pageable pageable, @Param("title") String title);

	@Query(value = "SELECT b.idx, b.title, b.nickname, b.content, b.create_Date FROM Board b WHERE MATCH(content) AGAINST(:content IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<BoardDTO> getBoardsByContent(Pageable pageable, @Param("content") String content);
	
	@Query("SELECT b FROM Board b WHERE b.member.userid = :userid AND b.idx = :idx")
	Board getBoardByUserID(@Param("userid") String userid, @Param("idx") int idx);
}
