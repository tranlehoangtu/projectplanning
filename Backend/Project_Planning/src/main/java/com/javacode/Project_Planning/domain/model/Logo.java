package com.javacode.Project_Planning.domain.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "logos")
public class Logo {
	private String id;
	private String name;
	private List<LogoType> content = new ArrayList<>();
}
