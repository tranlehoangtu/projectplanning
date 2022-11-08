package com.javacode.Project_Planning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.model.State;
import com.javacode.Project_Planning.repository.StateRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/state")
public class StateController {
	private final StateRepository stateRepository;

	@PostMapping("")
	public String postObject(@RequestBody State object) {
		object.getBlocks().forEach(block -> {
			System.out.println(block.toString());
		});
		
		stateRepository.insert(object);
		
		return "Success";
	}

	@GetMapping("/{id}")
	public ResponseEntity<State> getStateById(@PathVariable(value = "id") String id) {

		State state = stateRepository.findById(id).get();
		System.out.println(state.toString());
		
		return ResponseEntity.ok().body(state);
	}
}
