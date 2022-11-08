package com.javacode.Project_Planning.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.dto.UserAuthenticate;
import com.javacode.Project_Planning.domain.dto.UserConfirm;
import com.javacode.Project_Planning.domain.dto.UserResponse;
import com.javacode.Project_Planning.domain.model.USER_VALIDATION;
import com.javacode.Project_Planning.domain.model.User;
import com.javacode.Project_Planning.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PostMapping("/login")
	public ResponseEntity<UserResponse> login(@RequestBody UserAuthenticate userAuthenticate) {
		String email = userAuthenticate.getEmail();
		String password = userAuthenticate.getPassword();

		User user = userService.authenticate(email, password);

		if (user != null) {
			UserResponse userResponse = new UserResponse();
			BeanUtils.copyProperties(user, userResponse);

			System.out.println(userResponse.toString());

			return ResponseEntity.ok().body(userResponse);
		}

		return ResponseEntity.ok().body(null);
	}

	@PostMapping("/signup")
	public ResponseEntity<UserResponse> signup(@RequestBody UserConfirm userConfirm) {

		String email = userConfirm.getEmail();
		String password = userConfirm.getPassword();
		String repassword = userConfirm.getRepassword();

		USER_VALIDATION authenticate = userService.signupAuthenticate(email, password, repassword);

		switch (authenticate) {
		case USER_DUPLICATED:
			return ResponseEntity.ok().body(new UserResponse(null, null, null, null, "username"));
		case SUCCESS:
			User user = new User();
			BeanUtils.copyProperties(userConfirm, user);

			User createdUser = userService.insert(user);

			return ResponseEntity.ok().body(new UserResponse(createdUser.getId(), createdUser.getEmail(),
					createdUser.getFullname(), null, "success"));
		case PASSWORD_DID_NOT_MATCH:
			return ResponseEntity.ok().body(new UserResponse(null, null, null, null, "password"));

		default:
			break;
		}

		return ResponseEntity.ok(null);

	}

	@PutMapping("/{id}")
	public ResponseEntity<UserResponse> updateLastProject(@RequestParam("change") String changeable,
			@RequestParam("last-project") String lastProject, @PathVariable(value = "id") String id) {

		if (changeable.equals("true")) {
			User user = userService.findById(id).get();
			user.setLastProject(lastProject);
			
			User updated = userService.save(user);
			
			UserResponse userResponse = new UserResponse();
			BeanUtils.copyProperties(updated, userResponse);

			return ResponseEntity.ok().body(userResponse);
		}

		return ResponseEntity.ok(null);
	}

}
