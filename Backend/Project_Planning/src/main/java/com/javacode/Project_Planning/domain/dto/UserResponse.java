package com.javacode.Project_Planning.domain.dto;

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
	
	private String message;
}
