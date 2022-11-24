package com.javacode.Project_Planning.domain.dto;

import java.util.Date;

import com.javacode.Project_Planning.domain.model.Project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteResponse {
	private String id;
	private Project project;
	private String message;
	private UserResponse fromUser;
	private UserResponse toUser;
	private String type;
	private String status;

	private Date createdAt = new Date();
}
