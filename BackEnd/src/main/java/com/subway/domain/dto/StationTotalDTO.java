package com.subway.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StationTotalDTO {
	
	private String date;
	private String station_name;
	private Byte gubun;
	private Long total_count;
}