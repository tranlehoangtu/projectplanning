package com.javacode.Project_Planning.domain.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "states")
public class State {
	private List<Block> blocks = new ArrayList<>();
	private EntityMap entityMap;

	private String userId;
}
