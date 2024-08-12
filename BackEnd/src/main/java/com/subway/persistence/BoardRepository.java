package com.subway.persistence;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.subway.domain.Board;
import com.subway.domain.dto.BoardDTO;
import com.subway.domain.dto.GetBoardDTO;

public interface BoardRepository extends JpaRepository<Board, Integer> {

	// 게시판 출력
	@Query(value = "SELECT b.idx, b.title, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.station_no = :station_no", nativeQuery = true)
	Page<GetBoardDTO> getBoards(Pageable pageable, @Param("station_no") int station_no);
	
	// 마이페이지 게시판 출력
	@Query(value = "SELECT b.idx, b.title, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.userid = :userid", nativeQuery = true)
	Page<GetBoardDTO> getMyBoards(Pageable pageable, @Param("userid") String userid);

	// 게시글 조회
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.station_no = :station_no AND b.idx = :idx", nativeQuery = true)
	BoardDTO viewBoards(@Param("station_no") int station_no, @Param("idx") int idx);

	/* -- 검색기능 -- */
	// 닉네임으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE m.nickname like %:nickname%", nativeQuery = true)
	Page<GetBoardDTO> findBoardsByNickname(Pageable pageable, @Param("nickname") String keyword);

	// 제목으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE MATCH(title) AGAINST(:title IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<GetBoardDTO> findBoardsByTitle(Pageable pageable, @Param("title") String keyword);

	// 내용으로 검색
	@Query(value = "SELECT b.idx, b.title, b.content, b.create_Date, m.nickname, b.station_no "
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE MATCH(content) AGAINST(:content IN NATURAL LANGUAGE MODE)", nativeQuery = true)
	Page<GetBoardDTO> findBoardsByContent(Pageable pageable, @Param("content") String keyword);
	
	/* -- 검색기능 끝 -- */
	
	// 게시글 삭제
	@Modifying
	@Query(value = "DELETE FROM Board b WHERE b.idx=:idx AND b.userid = :userid", nativeQuery = true)
	int deleteBoardByUserID(@Param("userid") String userid, @Param("idx") int idx);
	
	// passenger_count 검색 - 날짜 기준 데이터
	@Query(value = "SELECT sl.station_name, pc.date, pc.gubun, "
			+ "hour_01_02, hour_02_03, hour_03_04, hour_04_05, hour_05_06, hour_06_07, hour_07_08, hour_08_09, hour_09_10, hour_10_11, hour_11_12, hour_12_13, hour_13_14, hour_14_15, hour_15_16, hour_16_17, hour_17_18, hour_18_19, hour_19_20, hour_20_21, hour_21_22, hour_22_23, hour_23_24, hour_24_01 "
			+ "FROM passenger_count pc, station_list sl "
			+ "WHERE pc.station_no = sl.station_no and pc.station_no = :station_no AND pc.date in (:date)", nativeQuery = true)
	List<Object[]> getStationDataByDate(
			@Param(value = "station_no") int station_no,
			@Param(value = "date") List<Date> datelist);
	
	// passenger_count 검색 - 시간대 컬럼 동적 쿼리
	@Query(value = ":query", nativeQuery = true)
	List<Object[]> getStationDataByHours(
			@Param(value = "query") String query);

}
