package com.javacode.Project_Planning.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.model.Avatar;
import com.javacode.Project_Planning.service.AvatarService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/avatar")
public class AvatarController {
	
	private final AvatarService service;
	
	@GetMapping("")
	public ResponseEntity<List<Avatar>> getAllAvatar() {
		return ResponseEntity.ok().body(service.findAll());
	}
}
