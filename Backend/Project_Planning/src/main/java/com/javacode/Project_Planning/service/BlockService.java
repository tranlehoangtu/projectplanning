package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.Block;
import com.javacode.Project_Planning.repository.BlockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlockService {
	private final BlockRepository blockRepository;

	public Optional<Block> findById(String id) {
		return blockRepository.findById(id);
	}

	public <S extends Block> S save(S entity) {
		return blockRepository.save(entity);
	}

	public <S extends Block> S insert(S entity) {
		return blockRepository.insert(entity);
	}

	public List<Block> findAll() {
		return blockRepository.findAll();
	}
	
	

}
