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
public class StationDTO {
	
	private String station_name;
	private String date;
	private Byte gubun;
	private Long total_count;
	private Integer hour_01_02;
	private Integer hour_02_03;
	private Integer hour_03_04;
	private Integer hour_04_05;
	private Integer hour_05_06;
	private Integer hour_06_07;
	private Integer hour_07_08;
	private Integer hour_08_09;
	private Integer hour_09_10;
	private Integer hour_10_11;
	private Integer hour_11_12;
	private Integer hour_12_13;
	private Integer hour_13_14;
	private Integer hour_14_15;
	private Integer hour_15_16;
	private Integer hour_16_17;
	private Integer hour_17_18;
	private Integer hour_18_19;
	private Integer hour_19_20;
	private Integer hour_20_21;
	private Integer hour_21_22;
	private Integer hour_22_23;
	private Integer hour_23_24;
	private Integer hour_24_01;
}