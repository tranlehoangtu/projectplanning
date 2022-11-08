package com.javacode.Project_Planning.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inline_style_ranges")
public class InlineStyleRange {
	@Id
	private String id;
	private int offset;
	private int length;
}
