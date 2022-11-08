package com.javacode.Project_Planning.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.javacode.Project_Planning.domain.model.Logo;

@Repository
public interface LogoRepository extends MongoRepository<Logo, String> {

}
