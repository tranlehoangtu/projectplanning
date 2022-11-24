package com.javacode.Project_Planning.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	private String id;
	
	private String email;
	private String fullname;
	private String lastProject;
	
	private List<String> favorites;
	private List<String> privates;
	private List<String> publics;
	
	private String color;
	
	private String message;
}
