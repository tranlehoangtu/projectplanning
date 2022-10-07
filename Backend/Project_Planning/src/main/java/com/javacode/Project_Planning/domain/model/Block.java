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
@Document("blocks")
public class Block {
	private String id;
	private Integer depth;
	private List<String> entityRanges = new ArrayList<>();
	private List<InlineStyleRange> inlineStyleRanges = new ArrayList<>();
	private String text;
	private String type;
	private String key;
}
