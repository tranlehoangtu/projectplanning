package com.javacode.Project_Planning.controller;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.dto.UserLoginRequest;
import com.javacode.Project_Planning.domain.dto.UserResponse;
import com.javacode.Project_Planning.domain.model.User;
import com.javacode.Project_Planning.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

	private final UserService service;

	@PostMapping("/login")
	public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		String email = userLoginRequest.getEmail();
		String password = userLoginRequest.getPassword();

		Optional<User> authenticatedUser = service.login(email, password);

		if (authenticatedUser.isEmpty())
			return null;

		UserResponse response = new UserResponse();
		BeanUtils.copyProperties(authenticatedUser.get(), response);

		return ResponseEntity.ok().body(response);
	}
}
