package com.javacode.Project_Planning.domain.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogoType {
	private String id;
	private String name;
	private List<List<Integer>> content = new ArrayList<>();
	
}
