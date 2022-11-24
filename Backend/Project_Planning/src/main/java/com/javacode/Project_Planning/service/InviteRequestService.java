package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.InviteRequest;
import com.javacode.Project_Planning.repository.InviteRequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InviteRequestService {
	private final InviteRequestRepository repository;
	
	public <S extends InviteRequest> S save(S entity) {
		return repository.save(entity);
	}

	public List<InviteRequest> findAll() {
		return repository.findAll();
	}

	public <S extends InviteRequest> S insert(S entity) {
		return repository.insert(entity);
	}

	public Optional<InviteRequest> findById(String id) {
		return repository.findById(id);
	}

	public List<InviteRequest> findByToUserAndStatus(String toUser, String status) {
		return repository.findByToUserAndStatus(toUser, status);
	}

	public List<InviteRequest> findByFromUserAndStatus(String fromUser, String status) {
		return repository.findByFromUserAndStatus(fromUser, status);
	}

	public void deleteById(String id) {
		repository.deleteById(id);
	}
	
	
}
