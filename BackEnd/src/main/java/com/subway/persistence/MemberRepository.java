package com.subway.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.subway.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

}
