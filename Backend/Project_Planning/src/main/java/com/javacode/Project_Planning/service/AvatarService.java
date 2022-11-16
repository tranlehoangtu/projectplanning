package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.Avatar;
import com.javacode.Project_Planning.repository.AvatarRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AvatarService {
	private final AvatarRepository repository;

	public <S extends Avatar> S save(S entity) {
		return repository.save(entity);
	}

	public List<Avatar> findAll() {
		return repository.findAll();
	}

	public <S extends Avatar> S insert(S entity) {
		return repository.insert(entity);
	}

	public Optional<Avatar> findById(String id) {
		return repository.findById(id);
	}

}
