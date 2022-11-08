package com.javacode.Project_Planning.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "entity_ranges")
public class EntityRange {
	@Id
	private String id;
	private String key;
	private int offset;
	private int length;
}
