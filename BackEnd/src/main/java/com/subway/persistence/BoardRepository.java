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
			+ "FROM Board b JOIN Member m ON b.userid = m.userid WHERE b.idx = :idx", nativeQuery = true)
	BoardDTO viewBoards(@Param("idx") int idx);

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
	
	/* -- 아래는 Station 데이터 조회용 네이티브 쿼리문 메서드들 -- */
	
	// passenger_count 검색 - 특정 역 기준 하루 데이터
	@Query(value = "SELECT sl.station_name, pc.date, pc.gubun, "
			+ "(hour_05_06 + hour_06_07 + hour_07_08 + hour_08_09 + hour_09_10 + hour_10_11 + hour_11_12 + hour_12_13 + hour_13_14 + hour_14_15 + hour_15_16 + hour_16_17 + hour_17_18 + hour_18_19 + hour_19_20 + hour_20_21 + hour_21_22 + hour_22_23 + hour_23_24 + hour_24_01) "
			+ "AS total_count, "
			+ "hour_05_06, hour_06_07, hour_07_08, hour_08_09, hour_09_10, hour_10_11, hour_11_12, hour_12_13, hour_13_14, hour_14_15, hour_15_16, hour_16_17, hour_17_18, hour_18_19, hour_19_20, hour_20_21, hour_21_22, hour_22_23, hour_23_24, hour_24_01 "
			+ "FROM passenger_count pc, station_list sl "
			+ "WHERE pc.station_no = sl.station_no and pc.station_no = :station_no AND pc.date in (:date);", nativeQuery = true)
	List<Object[]> getStationDataByDate(
			@Param(value = "station_no") int station_no,
			@Param(value = "date") List<Date> datelist);

	// passenger_count 검색 - 특정 역 기준 6개월치 데이터
	@Query(value = "WITH daily_totals AS (SELECT date, gubun, sl.station_name, "
			+ "(hour_05_06 + hour_06_07 + hour_07_08 + hour_08_09 + hour_09_10 + hour_10_11 + hour_11_12 + hour_12_13 + hour_13_14 + hour_14_15 + hour_15_16 + hour_16_17 + hour_17_18 + hour_18_19 + hour_19_20 + hour_20_21 + hour_21_22 + hour_22_23 + hour_23_24 + hour_24_01) "
			+ "AS total_count "
			+ "FROM passenger_count pc, station_list sl "
			+ "WHERE pc.station_no = sl.station_no "
			+ "AND pc.station_no = :station_no "
			+ "AND date BETWEEN '2024-01-01' AND '2024-06-30') "
			+ "SELECT station_name, DATE_FORMAT(date, '%Y-%m') AS month, gubun, SUM(total_count) AS total_count_month "
			+ "FROM daily_totals "
			+ "GROUP BY station_name, gubun, month "
			+ "ORDER BY month", nativeQuery = true)
	List<Object[]> getStationAllTotalCount(
			@Param(value = "station_no") int station_no);
	
	// passenger_count 검색 - 특정 역 기준 1주일치 데이터
	@Query(value = "SELECT sl.station_name, date, gubun, "
			+ "(hour_05_06 + hour_06_07 + hour_07_08 + hour_08_09 + hour_09_10 + hour_10_11 + hour_11_12 + hour_12_13 + hour_13_14 + hour_14_15 + hour_15_16 + hour_16_17 + hour_17_18 + hour_18_19 + hour_19_20 + hour_20_21 + hour_21_22 + hour_22_23 + hour_23_24 + hour_24_01) "
			+ "AS total_count "
			+ "FROM passenger_count pc, station_list sl "
			+ "WHERE pc.station_no = sl.station_no "
			+ "AND pc.station_no = :station_no "
			+ "AND date between :dateRange1 AND :dateRange2 "
			+ "ORDER BY date;", nativeQuery = true)
	List<Object[]> getStationMonthlyTotalCount(
			@Param(value = "station_no") int station_no,
			@Param(value = "dateRange1") String dateRange,
			@Param(value = "dateRange2") String dateRange2);
	
	// passenger_count 검색 - 특정 역 기준 1달을 1주일로 나눈 단위 데이터
	@Query(value = "SELECT sl.station_name, "
			+ "CONCAT(DATE_FORMAT(MIN(pc.date), '%Y-%m-%d'), ' ~ ', "
			+ "DATE_FORMAT(LEAST(DATE_ADD(MIN(pc.date), INTERVAL 6 DAY), LAST_DAY(MIN(pc.date))), '%Y-%m-%d')) AS date, pc.gubun, "
			+ "SUM(pc.hour_05_06 + pc.hour_06_07 + pc.hour_07_08 + pc.hour_08_09 + pc.hour_09_10 + pc.hour_10_11 + pc.hour_11_12 + pc.hour_12_13 + pc.hour_13_14 + pc.hour_14_15 + pc.hour_15_16 + pc.hour_16_17 + pc.hour_17_18 + pc.hour_18_19 + pc.hour_19_20 + pc.hour_20_21 + pc.hour_21_22 + pc.hour_22_23 + pc.hour_23_24 + pc.hour_24_01) "
			+ "AS total_count "
			+ "FROM passenger_count pc "
			+ "JOIN station_list sl ON pc.station_no = sl.station_no "
			+ "WHERE pc.station_no = :station_no "
			+ "AND pc.date like :monthDate GROUP BY sl.station_name, pc.gubun, FLOOR(DATEDIFF(pc.date, CONCAT(YEAR(CURDATE()), '-', :month, '-01')) / 7) "
			+ "ORDER BY date;", nativeQuery = true)
	List<Object[]> getStationMonthTotalCountDivWeek(
			@Param(value = "station_no") int station_no,
			@Param(value = "monthDate") String monthDate,
			@Param(value = "month") int month);
	
}
