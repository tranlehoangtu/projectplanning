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
@Document(value = "avatars")
public class Avatar {
	@Id
	private String id;
	private String name;
	private List<Item> content = new ArrayList<>();
}
