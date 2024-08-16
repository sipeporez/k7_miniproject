package com.subway.domain.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestStationDataDTO {
	
	private Integer station_no;
	@JsonProperty("date")
	private List<Date> datelist;
	@JsonProperty("hour")
	private List<String> hourlist;
	private Integer month;
	private Integer day1;
	private Integer day2;

}
