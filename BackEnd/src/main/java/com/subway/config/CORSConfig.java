package com.subway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		
		
		 registry.addMapping("/**")
	         .allowedOrigins("*")  // 모든 출처 허용
	         .allowedMethods("*")  // 모든 HTTP 메서드 허용
	         .exposedHeaders(HttpHeaders.AUTHORIZATION)
	         .allowedHeaders("*");  // 모든 헤더 허용
		 
		registry.addMapping("/login")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.CONTENT_TYPE)
				.exposedHeaders(HttpHeaders.AUTHORIZATION) 
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/login/**")
		.allowCredentials(true)
		.allowedHeaders(HttpHeaders.CONTENT_TYPE,
				HttpHeaders.AUTHORIZATION)
		.exposedHeaders(HttpHeaders.AUTHORIZATION) 
		.allowedMethods(
				HttpMethod.GET.name(),
				HttpMethod.POST.name())
		.allowedOrigins(
				"http://localhost:3000",
				"http://127.0.0.1:3000",
				"http://192.168.0.131:3000",
				"http://192.168.0.126:3000",
				"http://192.168.0.131.nip.io:3000",
				"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/signup/**")
				.allowedHeaders(HttpHeaders.CONTENT_TYPE)
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/board/**")
				.allowCredentials(true)
				.allowedMethods(
						HttpMethod.GET.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		registry.addMapping("/search/**")
		.allowCredentials(true)
		.allowedMethods(
				HttpMethod.GET.name())
		.allowedOrigins(
				"http://localhost:3000",
				"http://127.0.0.1:3000",
				"http://192.168.0.131:3000",
				"http://192.168.0.126:3000",
				"http://192.168.0.131.nip.io:3000",
				"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/write**")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.CONTENT_TYPE, HttpHeaders.AUTHORIZATION)
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/edit**")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.CONTENT_TYPE, HttpHeaders.AUTHORIZATION)
				.allowedMethods(
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/checkUser**")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.CONTENT_TYPE, HttpHeaders.AUTHORIZATION)
				.allowedMethods(
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/delete**")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.AUTHORIZATION)
				.allowedMethods(
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/mypage/**")
				.allowCredentials(true)
				.allowedHeaders(
						HttpHeaders.CONTENT_TYPE,
						HttpHeaders.AUTHORIZATION)
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
		
		registry.addMapping("/subway/**")
				.allowCredentials(true)
				.allowedHeaders(HttpHeaders.CONTENT_TYPE)
				.allowedMethods(
						HttpMethod.POST.name())
				.allowedOrigins(
						"http://localhost:3000",
						"http://127.0.0.1:3000",
						"http://192.168.0.131:3000",
						"http://192.168.0.126:3000",
						"http://192.168.0.131.nip.io:3000",
						"http://192.168.0.126.nip.io:3000");
	}
}
