package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.Project;
import com.javacode.Project_Planning.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
	private final ProjectRepository projectRepository;

	public <S extends Project> S save(S entity) {
		return projectRepository.save(entity);
	}

	public List<Project> findAll() {
		return projectRepository.findAll();
	}

	public <S extends Project> S insert(S entity) {
		return projectRepository.insert(entity);
	}

	public Optional<Project> findById(String id) {
		return projectRepository.findById(id);
	}

	public List<Project> findByUserId(String userId) {
		return projectRepository.findByUserId(userId);
	}

	public List<Project> findByParent(String parent) {
		return projectRepository.findByParrent(parent);
	}

	public void delete(Project entity) {
		projectRepository.delete(entity);
	}

}
