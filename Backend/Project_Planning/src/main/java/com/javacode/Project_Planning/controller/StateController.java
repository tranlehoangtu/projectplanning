package com.javacode.Project_Planning.controller;

import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class StateController {
	
	@GetMapping("hello")
	public String hello() {
		return "Hello World";
	}

	@PostMapping("state")
	public void saveState(@RequestBody JSONObject jo) {
		System.out.println(jo);
		JSONArray ja = (JSONArray) jo.get("inlineStyleRanges");
		System.out.println(ja);
	}

	@PostMapping("states")
	public void saveStates(@RequestBody Map<String, Object> blocks) {
		System.out.println(blocks);
	}
}
