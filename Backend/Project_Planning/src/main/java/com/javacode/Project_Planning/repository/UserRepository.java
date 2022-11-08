package com.javacode.Project_Planning.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.javacode.Project_Planning.domain.model.User;

public interface UserRepository extends MongoRepository<User, String> {
	Optional<User> findByEmail(String email);
}
