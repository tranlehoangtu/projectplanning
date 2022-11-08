package com.javacode.Project_Planning.domain.dto;

import com.javacode.Project_Planning.domain.model.State;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveProject {
	
	private String id;
	private String name;
	
	private State state;
}
