package com.subway.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idx;

	@Column(nullable = false, length = 64)
	private String title;

	@ManyToOne
	@JoinColumn(name = "userid", nullable = false)
	private Member member;

	@Column(nullable = false, length = 2000)
	private String content;

	@Column(nullable = false)
	private int station_no;

	@Builder.Default
	@Column(nullable = false)
	private Date createDate = new Date();


}
