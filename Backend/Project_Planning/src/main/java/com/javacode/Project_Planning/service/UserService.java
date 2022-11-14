package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.User;
import com.javacode.Project_Planning.domain.model.USER_VALIDATION;
import com.javacode.Project_Planning.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public <S extends User> S save(S entity) {
		return userRepository.save(entity);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public <S extends User> S insert(S entity) {
		String encodePassword = passwordEncoder.encode(entity.getPassword());
		entity.setPassword(encodePassword);

		return userRepository.insert(entity);
	}

	public Optional<User> findById(String id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public USER_VALIDATION signupAuthenticate(String email, String password, String repassword) {
		Optional<User> userOptional = userRepository.findByEmail(email);

		if (userOptional.isEmpty()) {
			if (password.equals(repassword))
				return USER_VALIDATION.SUCCESS;

			return USER_VALIDATION.PASSWORD_DID_NOT_MATCH;
		}

		return USER_VALIDATION.USER_DUPLICATED;
	}

	public Optional<User> login(String email, String password) {

		Optional<User> optUser = userRepository.findByEmail(email);
		
		if (optUser.isPresent() && passwordEncoder.matches(password, optUser.get().getPassword())) 
			return optUser;

		return Optional.empty();
	}

}
