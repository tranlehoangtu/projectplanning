package com.javacode.Project_Planning.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.dto.UserConfirm;
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

	private final UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable(value = "id") String id) {
		User user = userService.findById(id).get();
		user.setPassword("");
		return ResponseEntity.ok().body(user);
	}

	@GetMapping("/{email}/email")
	public ResponseEntity<UserResponse> getUserByEmail(@PathVariable(value = "email") String email) {
		Optional<User> optional = userService.findByEmail(email);

		if (optional.isPresent()) {
			UserResponse userResponse = new UserResponse();
			BeanUtils.copyProperties(optional.get(), userResponse);

			return ResponseEntity.ok().body(userResponse);
		}

		return null;
	}

	@PostMapping("/login")
	public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		String email = userLoginRequest.getEmail();
		String password = userLoginRequest.getPassword();

		Optional<User> authenticatedUser = userService.login(email, password);

		if (authenticatedUser.isEmpty())
			return null;

		UserResponse response = new UserResponse();
		BeanUtils.copyProperties(authenticatedUser.get(), response);

		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/signup")
	public ResponseEntity<UserResponse> signup(@RequestBody UserConfirm userConfirm) {
		Optional<User> optional = userService.findByEmail(userConfirm.getEmail());

		if (optional.isPresent()) {
			UserResponse userResponse = new UserResponse();
			userResponse.setMessage("email");

			return ResponseEntity.ok().body(userResponse);
		} else if (!(userConfirm.getPassword().equals(userConfirm.getRepassword()))) {
			UserResponse userResponse = new UserResponse();
			userResponse.setMessage("password");

			return ResponseEntity.ok().body(userResponse);
		}

		User user = new User();
		BeanUtils.copyProperties(userConfirm, user);

		user = userService.insert(user);

		UserResponse userResponse = new UserResponse();
		BeanUtils.copyProperties(user, userResponse);

		return ResponseEntity.ok().body(userResponse);
	}

	@PutMapping("/update")
	public void updateUser(@RequestBody User user) {
		User foundUser = userService.findById(user.getId()).get();
		String password = foundUser.getPassword();

		user.setPassword(password);

		userService.save(user);
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers() {

		List<User> users = userService.findAll();

		return ResponseEntity.ok().body(users.stream().map(item -> {
			item.setPassword(null);
			return item;
		}).collect(Collectors.toList()));
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable(value = "id") String id) {
		userService.deleteById(id);
	}

}
