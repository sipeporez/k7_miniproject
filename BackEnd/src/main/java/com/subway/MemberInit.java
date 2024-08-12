package com.subway;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.subway.domain.Member;
import com.subway.domain.Role;
import com.subway.persistence.MemberRepository;
import com.subway.service.RandomNicknameService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MemberInit implements ApplicationRunner{
	private final MemberRepository mr;
	private final PasswordEncoder enc;
	private final RandomNicknameService rns;
	@Override
	public void run(ApplicationArguments args) throws Exception {
		mr.save(Member.builder()
				.userid("aaaa")
				.password(enc.encode("11"))
				.nickname(rns.makeRandomNickname())
				.build());
		mr.save(Member.builder()
				.userid("bbbb")
				.password(enc.encode("11"))
				.nickname(rns.makeRandomNickname())
				.role(Role.ROLE_ADMIN)
				.build());
	}

}
