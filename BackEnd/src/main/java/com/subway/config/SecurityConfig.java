package com.subway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

import com.subway.config.filter.JWTAuthenFilter;
import com.subway.config.filter.JWTAuthoFilter;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
	
	private final MemberRepository mr;
	private final AuthenticationConfiguration authcon;
	private final OAuth2SuccessHandler sh;	// OAuth2.0용 핸들러
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.authorizeHttpRequests(ah-> ah
				.requestMatchers("/write**").authenticated()
				.requestMatchers("/edit**").authenticated()
				.requestMatchers("/mypage**").authenticated()
				.anyRequest().permitAll());
		http.formLogin(fl-> fl.loginPage("/login").permitAll());
		
		http.oauth2Login(o2->o2.successHandler(sh));
		
		http.httpBasic(b->b.disable());
		
		http.csrf(cs->cs.disable());
		
		http.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		http.logout(logout->logout
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
				.logoutSuccessUrl("/index"));
		
		http.addFilterBefore(new JWTAuthoFilter(mr), AuthorizationFilter.class);
		http.addFilter(new JWTAuthenFilter(authcon.getAuthenticationManager()));
	
		return http.build();
	}

}
