package com.subway.domain.dto;

import java.util.Date;

// 네이티브 쿼리를 위한 BoardDTO Projection

public interface BoardDTO {
	int getIdx();
	String getTitle();
	String getNickname();
	String getContent();
	Date getCreate_Date();
	int getStation_no();
}