package com.javacode.Project_Planning.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InlineStyleRange {
	private String offset;
	private String length;
	private String style;
}
