package com.javacode.Project_Planning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	@PostMapping("/project/create")
	public ResponseEntity<Project> createProject(@RequestBody ProjectCreate projectCreate) {
		System.out.println(projectCreate.toString());

		Project project = new Project();

		project.setName("Untitled");
		project.setState(projectCreate.getState());
		project.setParrent(projectCreate.getParent());
		project.setUserId(projectCreate.getUserId());

		return ResponseEntity.ok().body(service.insert(project));
	}

//	@GetMapping("/project/{id}")
//	public List<Project> getProjectsByUserId(@PathVariable(value = "id") String userId) {
//
//		List<Project> projects = service.findByUserId(userId).stream().filter(project -> !project.isTrashed())
//				.collect(Collectors.toList());
//
//		return projects;
//	}
//
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
//	@PostMapping("/project/save")
//	public ResponseEntity<Project> saveProject(@RequestBody Object saveProject) {
//		System.out.println(saveProject.toString());
//
//		return null;
//	}
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
