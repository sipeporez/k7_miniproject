package com.subway.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class subway_date {
	@Id @Column(nullable = false)
	private int date_no;
	
	@Column(nullable = false)
	private Date date_list;
	
	@Column(nullable = false)
	private String day_of_week;

}
