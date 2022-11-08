package com.javacode.Project_Planning.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.dto.ProjectCreate;
import com.javacode.Project_Planning.domain.model.Project;
import com.javacode.Project_Planning.service.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class ProjectController {

	private final ProjectService service;

	@GetMapping("/project/{id}")
	public List<Project> getProjectsByUserId(@PathVariable(value = "id") String userId) {

		return service.findByUserId(userId);
	}

	@PostMapping("/project/create")
	public ResponseEntity<Project> createProject(@RequestBody ProjectCreate projectCreate) {

		Project project = new Project();

		project.setParrent(projectCreate.getParent());
		project.setUserId(projectCreate.getUserId());
		project.setState(projectCreate.getState());
		project.setName("Untitled");
		project.setIcon("AiFillBug");

		return ResponseEntity.ok(service.insert(project));
	}

	@PostMapping("/project/save")
	public ResponseEntity<Project> saveProject(@RequestBody Object saveProject) {
		System.out.println(saveProject.toString());

		return null;
	}

//	@GetMapping("/project/{id}")
//	public Project getProjectById(@PathVariable(value = "id") String projectId) {
//		return service.findById(projectId).get();
//	}

}
