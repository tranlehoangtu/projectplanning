package com.javacode.Project_Planning.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@PostMapping("/project/create")
	public ResponseEntity<Project> createProject(@RequestBody ProjectCreate projectCreate) {
		Project project = new Project();

		project.setName("Untitled");
		
		project.setState(projectCreate.getState());
		project.setParrent(projectCreate.getParent());
		project.setUserId(projectCreate.getUserId());

		project.setCreatedAt(new Date());
		project.setEditAt(new Date());

		return ResponseEntity.ok().body(service.insert(project));
	}

	@GetMapping("/project")
	public List<Project> getProjectsByUserId(@RequestParam(value = "user-id") String userId) {

		List<Project> projects = service.findByUserId(userId).stream().filter(project -> !project.isTrashed())
				.collect(Collectors.toList());

		return projects;
	}
	
	@GetMapping("/project/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") String id) {
		
		return ResponseEntity.ok().body(service.findById(id).get());
	}

	@PutMapping("/project/{id}")
	public String modifyProjectProps(@PathVariable(value = "id") String id, @RequestBody Project project) {
		service.save(project);
		
		return "Success";
	}

//	@PostMapping("/project/create")
//	public ResponseEntity<Project> createProject(@RequestBody ProjectCreate projectCreate) {
//
//		Project project = new Project();
//
//		project.setParrent(projectCreate.getParent());
//		project.setUserId(projectCreate.getUserId());
//		project.setState(projectCreate.getState());
//		project.setName("Untitled");
//		project.setIcon("AiFillBug");
//
//		return ResponseEntity.ok(service.insert(project));
//	}
//
	@PostMapping("/project/save")
	public void saveProject(@RequestBody Project project) {

		service.save(project);
	}
//
//	@DeleteMapping("/project/delete/{id}")
//	public ResponseEntity<List<Project>> deleteProject(@PathVariable(value = "id") String projectId) {
//
//		List<Project> deletedProjects = new ArrayList<>();
//		
//		service.findByParent(projectId).forEach(project -> {
//			project.setTrashed(true);
//			service.save(project);
//			
//			deletedProjects.add(project);
//		});
//
//		Project project = service.findById(projectId).get();
//		project.setTrashed(true);
//		
//		deletedProjects.add(project);
//
//		service.save(project);
//
//		return ResponseEntity.ok(deletedProjects);
//	}
}
