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

import com.javacode.Project_Planning.domain.model.Block;
import com.javacode.Project_Planning.service.BlockService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class BlockController {
	private final BlockService blockService;

	@GetMapping("block/{id}")
	public ResponseEntity<Block> get(@PathVariable("id") String id) {
		return ResponseEntity.ok().body(blockService.findById(id).get());
	}

	@PostMapping("block")
	public void postBlock(@RequestBody Block block) {
		blockService.insert(block);
	}
}
