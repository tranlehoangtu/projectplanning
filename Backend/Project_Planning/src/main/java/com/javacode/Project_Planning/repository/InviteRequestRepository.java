package com.javacode.Project_Planning.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.javacode.Project_Planning.domain.model.InviteRequest;

@Repository
public interface InviteRequestRepository extends MongoRepository<InviteRequest, String> {
	List<InviteRequest> findByFromUserAndStatus(String fromUser, String status);
	List<InviteRequest> findByToUserAndStatus(String toUser, String status);
}
