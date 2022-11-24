package com.javacode.Project_Planning.domain.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(value = "invite_requests")
public class InviteRequest {
	@Id
	private String id;
	private String projectId;
	private String message;
	private String fromUser;
	private String toUser;
	private String type;
	private String status;

	private Date createdAt = new Date();
}
