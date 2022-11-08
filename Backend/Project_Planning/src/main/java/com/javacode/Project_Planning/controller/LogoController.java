package com.javacode.Project_Planning.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.model.Logo;
import com.javacode.Project_Planning.service.LogoService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/logo")
@CrossOrigin
public class LogoController {

	private final LogoService logoService;

	@GetMapping("/logos")
	public ResponseEntity<List<Logo>> getAllLogo() {
		return ResponseEntity.ok().body(logoService.findAll());
	}
}
