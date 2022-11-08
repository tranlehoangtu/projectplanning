package com.javacode.Project_Planning.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.javacode.Project_Planning.domain.model.Block;

public interface BlockRepository extends MongoRepository<Block, String> {

}
