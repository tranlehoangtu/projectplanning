package com.javacode.Project_Planning.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserConfirm {
	private String email;
	private String password;
	private String repassword;
	private String fullname;

	private String color; 
}
