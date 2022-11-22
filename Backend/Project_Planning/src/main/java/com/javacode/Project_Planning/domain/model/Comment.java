package com.javacode.Project_Planning.domain.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	private String id;
	private String username;
	private String content;

	private Date createdAt = new Date();
	private Date editedAt = new Date();

	private String parent;

	private boolean resolved = false;
}
