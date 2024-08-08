package com.subway.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.subway.domain.dto.RequestStationDataDTO;
import com.subway.domain.dto.StationDTO;
import com.subway.persistence.BoardRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StationService {
	private final BoardRepository br;
	private final EntityManager em;

	public List<StationDTO> getStationDataByDate(RequestStationDataDTO dto) {
        List<StationDTO> list = new ArrayList<>();
        
		Integer station_no = dto.getStation_no();
		List<Date> dates = dto.getDatelist();
		
		List<Object[]> objs = (br.getStationDataByDate(station_no, dates));
		for (Object[] obj : objs) {
			list.add(StationDTO.builder()
					.station_name(obj[0].toString())
					.date(obj[1].toString())
					.gubun((Byte) obj[2])
					.hour_01_02((Integer) obj[3])
					.hour_02_03((Integer) obj[4])
					.hour_03_04((Integer) obj[5])
					.hour_04_05((Integer) obj[6])
					.hour_05_06((Integer) obj[7])
					.hour_06_07((Integer) obj[8])
					.hour_07_08((Integer) obj[9])
					.hour_08_09((Integer) obj[10])
					.hour_09_10((Integer) obj[11])
					.hour_10_11((Integer) obj[12])
					.hour_11_12((Integer) obj[13])
					.hour_12_13((Integer) obj[14])
					.hour_13_14((Integer) obj[15])
					.hour_14_15((Integer) obj[16])
					.hour_15_16((Integer) obj[17])
					.hour_16_17((Integer) obj[18])
					.hour_17_18((Integer) obj[19])
					.hour_18_19((Integer) obj[20])
					.hour_19_20((Integer) obj[21])
					.hour_20_21((Integer) obj[22])
					.hour_21_22((Integer) obj[23])
					.hour_22_23((Integer) obj[24])
					.hour_23_24((Integer) obj[25])
					.hour_24_01((Integer) obj[26])
					.build());
		}
		return list;
	}
	// 동적으로 시간대 / 날짜 받아와서 SQL 쿼리문 조회 
	public List<StationDTO> getStationDataByHours(RequestStationDataDTO dto) {
		Integer station_no = dto.getStation_no();
		List<Date> dates = dto.getDatelist();
		List<String> hours = dto.getHourlist();
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		
		String query = "SELECT sl.station_name, pc.date, pc.gubun";
				for (String h : hours) {query += ", "+ h;}
				query += " FROM passenger_count pc, station_list sl ";
				query += "WHERE pc.station_no = sl.station_no and pc.station_no = ";
				query += station_no;
				query += " AND pc.date in (";
				for (Date d : dates) {query +="'" + formatter.format(d) + "', ";}
				query = query.substring(0,query.length()-2);
				query += ")";
		Query sql = em.createNativeQuery(query);
		
		List<StationDTO> list = new ArrayList<>();
		
		@SuppressWarnings("unchecked")
		List<Object[]> results = sql.getResultList();
		for (Object[] result : results) {
			Map<String, Integer> hourMap = new HashMap<>();
			for (int i = 3; i < result.length; i++) {
				hourMap.put(hours.get(i - 3), (Integer) result[i]);
			}
			list.add(StationDTO.builder()
				.station_name(result[0].toString())
				.date(result[1].toString())
				.gubun((Byte) result[2])
				.hour_01_02(hourMap.getOrDefault("hour_01_02", null))
				.hour_02_03(hourMap.getOrDefault("hour_02_03", null))
				.hour_03_04(hourMap.getOrDefault("hour_03_04", null))
				.hour_04_05(hourMap.getOrDefault("hour_04_05", null))
				.hour_05_06(hourMap.getOrDefault("hour_05_06", null))
				.hour_06_07(hourMap.getOrDefault("hour_06_07", null))
				.hour_07_08(hourMap.getOrDefault("hour_07_08", null))
				.hour_08_09(hourMap.getOrDefault("hour_08_09", null))
				.hour_09_10(hourMap.getOrDefault("hour_09_10", null))
				.hour_10_11(hourMap.getOrDefault("hour_10_11", null))
				.hour_11_12(hourMap.getOrDefault("hour_11_12", null))
				.hour_12_13(hourMap.getOrDefault("hour_12_13", null))
				.hour_13_14(hourMap.getOrDefault("hour_13_14", null))
				.hour_14_15(hourMap.getOrDefault("hour_14_15", null))
				.hour_15_16(hourMap.getOrDefault("hour_15_16", null))
				.hour_16_17(hourMap.getOrDefault("hour_16_17", null))
				.hour_17_18(hourMap.getOrDefault("hour_17_18", null))
				.hour_18_19(hourMap.getOrDefault("hour_18_19", null))
				.hour_19_20(hourMap.getOrDefault("hour_19_20", null))
				.hour_20_21(hourMap.getOrDefault("hour_20_21", null))
				.hour_21_22(hourMap.getOrDefault("hour_21_22", null))
				.hour_22_23(hourMap.getOrDefault("hour_22_23", null))
				.hour_23_24(hourMap.getOrDefault("hour_23_24", null))
				.hour_24_01(hourMap.getOrDefault("hour_24_01", null))
				.build());
		}
		return list;
	}

}
