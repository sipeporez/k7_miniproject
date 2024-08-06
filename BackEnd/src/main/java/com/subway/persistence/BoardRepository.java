package com.subway.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.subway.domain.Board;
import com.subway.domain.BoardDTO;

public interface BoardRepository extends JpaRepository<Board, Integer> {

	// 게시판 출력
	@Query(value = "SELECT b.idx, b.title, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.station_no = :station_no", nativeQuery = true)
	Page<BoardDTO> getBoards(Pageable pageable, @Param("station_no") int station_no);

	// 게시글 조회
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.station_no = :station_no AND b.idx = :idx", nativeQuery = true)
	BoardDTO viewBoards(@Param("station_no") int station_no, @Param("idx") int idx);

	/* 검색기능 */
	// 닉네임으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE m.nickname like %:nickname%", nativeQuery = true)
	Page<BoardDTO> getBoardsByNickname(Pageable pageable, @Param("nickname") String nickname);

	// 제목으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE MATCH(title) AGAINST(:title IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<BoardDTO> getBoardsByTitle(Pageable pageable, @Param("title") String title);

	// 내용으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE MATCH(content) AGAINST(:content IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<BoardDTO> getBoardsByContent(Pageable pageable, @Param("content") String content);
	
	// 게시글 삭제
	@Modifying
	@Query(value = "DELETE FROM Board b WHERE b.idx=:idx AND b.userid = :userid", nativeQuery = true)
	int deleteBoardByUserID(@Param("userid") String userid, @Param("idx") int idx);
}
