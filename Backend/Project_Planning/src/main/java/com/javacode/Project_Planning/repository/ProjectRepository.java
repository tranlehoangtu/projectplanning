package com.javacode.Project_Planning.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.javacode.Project_Planning.domain.model.Project;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
	List<Project> findByUserId(String userId);
	List<Project> findByParent(String parent);
	
	List<Project> findByUserIdOrderByEditAtDesc(String userId);
}
