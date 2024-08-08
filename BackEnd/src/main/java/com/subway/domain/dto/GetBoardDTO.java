package com.subway.domain.dto;

import java.util.Date;

public interface GetBoardDTO {
	int getIdx();
	String getTitle();
	String getNickname();
	Date getCreate_Date();
	int getStation_no();
}