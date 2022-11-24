package com.javacode.Project_Planning.domain.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class ProjectTemp {

	@Id
	private String id;
	private String name;

	private String userId;

	private String parent;

	private String background;
	private List<Integer> avatar = new ArrayList<>();
	private List<Comment> comments = new ArrayList<>();
	
	private List<String> fullaccess;
	private List<String> canEdits;
	private List<String> canComments;
	private List<String> canView;

	private State state;

	private Date createdAt = new Date();
	private Date editAt = new Date();

	private boolean trashed = false;
	private boolean isPrivate = true;
}
