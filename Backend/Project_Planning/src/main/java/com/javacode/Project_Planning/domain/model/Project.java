package com.javacode.Project_Planning.domain.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {
	private String id;
	private String name;

	private String parrent;
	private String userId;

	private List<Integer> avatar = List.of(0, 0);
	private String background;

	private State state;

	private boolean trashed = false;
}
