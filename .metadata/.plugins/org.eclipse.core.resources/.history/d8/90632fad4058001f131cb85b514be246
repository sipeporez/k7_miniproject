package com.subway.config;


import java.io.IOException;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.subway.domain.Member;
import com.subway.domain.Role;
import com.subway.persistence.MemberRepository;
import com.subway.util.CustomMyUtil;
import com.subway.util.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final MemberRepository mr;
	private final PasswordEncoder enc;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.info("OAuth2SuccessHandler:onAuthenticationSuccess");
		OAuth2User user = (OAuth2User) authentication.getPrincipal();
		// 임의의 사용자를 만들어서 서버에 저장
		String username = CustomMyUtil.getUsernameFromOAuth2User(user);
		
		if (username == null) {
			log.error("Cannot generate username from oauth2user!");
			throw new ServletException("Cannot generate username from oauth2user!");
		}
		
		log.info("onAuthenticationSuccess:" + username);
		
		mr.save(Member.builder()
				.userid(username)
				.password(enc.encode("1a2s3d4f"))
				.regidate(new Date())
				.role(Role.ROLE_MEMBER)
				.enabled(1)
				.build());
		
		String jwtToken = JWTUtil.getJWT(username);
		
		response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken);
	}
}
