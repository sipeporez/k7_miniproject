package com.subway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

// Board에서 페이징 사용시 안정적인 JSON 구조로 직렬화 하기 위한 Config

@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class BoardConfig {
	
}
