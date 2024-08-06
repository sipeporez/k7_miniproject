package com.subway;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.subway.domain.Board;
import com.subway.domain.Member;
import com.subway.persistence.BoardRepository;
import com.subway.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Component
@Lazy
@RequiredArgsConstructor
public class BoardInit implements ApplicationRunner{
	private final MemberRepository mr;
	private final BoardRepository br;
	@Override
	public void run(ApplicationArguments args) throws Exception {
		
		Member member = mr.findById("aaaa")
				.orElseThrow(()->new UsernameNotFoundException("Not Found"));
		
		Member member2 = mr.findById("bbbb")
				.orElseThrow(()->new UsernameNotFoundException("Not Found"));
		
		br.save(Board.builder()
				.title("테스트용 게시글")
				.content("테스트용 내용")
				.member(member)
				.station_no(95)
				.build());
		br.save(Board.builder()
				.title("테스트용 게시글")
				.content("테스트용 내용")
				.member(member2)
				.station_no(96)
				.build());
		
	}

}
