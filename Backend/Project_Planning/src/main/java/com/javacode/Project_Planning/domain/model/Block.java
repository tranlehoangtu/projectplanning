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
@Document(collection = "blocks")
public class Block {
	@Id
	private String id;
	private String key;
	private String text;
	private String type;
	private int depth;
	private List<InlineStyleRange> inlineStyleRanges = new ArrayList<>();
}
