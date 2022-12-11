package com.javacode.Project_Planning.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	@GetMapping("/project/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") String id) {

		if (service.findById(id).isEmpty()) {
			return ResponseEntity.ok().body(null);
		}

		return ResponseEntity.ok().body(service.findById(id).get());
	}

	@GetMapping("/project")
	public ResponseEntity<List<Project>> getProjectsByParentId(@RequestParam("type") String type,
			@RequestParam("parent-id") String id) {

		if (type.equals("single")) {
			List<Project> result = service.findByParent(id);
			return ResponseEntity.ok().body(result);
		}

		if (type.equals("tree")) {
			List<Project> result = new ArrayList<>();

			getChilds(getRoot(id), result);
			Project project = service.findById(getRoot(id)).get();
			result.add(project);

			return ResponseEntity.ok().body(result);
		}

		// all
		List<Project> result = new ArrayList<>();
		return ResponseEntity.ok().body(getChilds(id, result));

	}

	@GetMapping("/project/name")
	public ResponseEntity<List<Project>> getProjectsByNameContaining(@RequestParam("name") String name) {
		if (name.isEmpty()) {
			return null;
		}
		return ResponseEntity.ok().body(service.findByNameContaining(name));
	}

	@PostMapping("/project/create")
	public ResponseEntity<Project> createProject(@RequestBody ProjectCreate projectCreate) {
		Project project = new Project();

		project.setName("Untitled");
		project.setUserId(projectCreate.getUserId());

		project.setState(projectCreate.getState());
		project.setParent(projectCreate.getParent());

		project.setCreatedAt(new Date());
		project.setEditAt(new Date());

		return ResponseEntity.ok().body(service.insert(project));
	}

	@PostMapping("/project/save")
	public void saveProject(@RequestBody Project project) {

		service.save(project);
	}

	@PutMapping("/project/{id}")
	public String modifyProjectProps(@PathVariable(value = "id") String id, @RequestBody Project project) {
		service.save(project);

		return "Success";
	}

	@PutMapping("/project/update")
	public ResponseEntity<Project> updateProject(@RequestBody Project project) {

		return ResponseEntity.ok().body(service.save(project));
	}

	@DeleteMapping("/project/delete/{id}")
	public void deleteProjectById(@PathVariable(value = "id") String id) {
		Project deletedProject = service.findById(id.trim()).get();
		service.delete(deletedProject);
	}

	private List<Project> getChilds(String id, List<Project> result) {
		List<Project> projects = service.findByParent(id);

		if (projects.size() > 0) {
			projects.forEach(item -> result.add(item));
			projects.forEach(item -> getChilds(item.getId(), result));
		}

		return result;
	}

	private String getRoot(String id) {
		String result = "";
		Project project = service.findById(id).get();

		result = project.getId();

		if (!project.getParent().equals("0")) {
			result = getRoot(project.getParent());
		}

		return result;
	}

}
