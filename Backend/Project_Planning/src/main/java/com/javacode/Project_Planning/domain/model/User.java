package com.javacode.Project_Planning.domain.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
	@Id
	private String id;

	private String email;
	private String password;
	private String fullname;

	private String lastProject;
	private String color;

	private List<String> favorites = new ArrayList<>();
	private List<String> privates = new ArrayList<>();
	private List<String> publics = new ArrayList<>();
	
	private boolean isBlock;
}