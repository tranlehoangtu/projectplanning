package com.javacode.Project_Planning.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javacode.Project_Planning.domain.dto.InviteResponse;
import com.javacode.Project_Planning.domain.dto.UserResponse;
import com.javacode.Project_Planning.domain.model.InviteRequest;
import com.javacode.Project_Planning.domain.model.Project;
import com.javacode.Project_Planning.domain.model.User;
import com.javacode.Project_Planning.service.InviteRequestService;
import com.javacode.Project_Planning.service.ProjectService;
import com.javacode.Project_Planning.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InviteRequestController {
	private final InviteRequestService service;
	private final UserService userService;
	private final ProjectService projectService;

	@GetMapping(value = "/invite")
	public ResponseEntity<List<InviteResponse>> getAllByFrom(@RequestParam(value = "type") String type,
			@RequestParam(value = "id") String id) {

		List<InviteResponse> result = new ArrayList<>();

		if (type.equals("to"))
			result = insertRequest(service.findByToUserAndStatus(id, "pending"));

		if (type.equals("from"))
			result = combineList(insertRequest(service.findByFromUserAndStatus(id, "accept")),
					insertRequest(service.findByFromUserAndStatus(id, "refuse")));

		return ResponseEntity.ok().body(result);

	}

	@PostMapping(value = "/invite")
	public ResponseEntity<List<InviteRequest>> invite(@RequestBody List<InviteRequest> invites) {
		List<InviteRequest> requests = new ArrayList<>();
		invites.forEach(item -> {
			requests.add(service.insert(item));
		});

		return ResponseEntity.ok().body(requests);
	}

	@PutMapping(value = "/invite/update")
	public void update(@RequestBody InviteResponse invite) {

		InviteRequest inviteRequest = new InviteRequest();
		BeanUtils.copyProperties(invite, inviteRequest);

		inviteRequest.setFromUser(invite.getFromUser().getId());
		inviteRequest.setToUser(invite.getToUser().getId());

		inviteRequest.setProjectId(invite.getProject().getId());

		service.save(inviteRequest);
	}

	@DeleteMapping(value = "/invite/delete/{id}")
	public void delete(@PathVariable("id") String id) {
		service.deleteById(id);
	}

	private List<InviteResponse> insertRequest(List<InviteRequest> requests) {
		List<InviteResponse> result = new ArrayList<>();

		requests.forEach(item -> {

			Project project = projectService.findById(item.getProjectId()).get();

			InviteResponse response = new InviteResponse();
			UserResponse fromResponse = new UserResponse();
			UserResponse toResponse = new UserResponse();

			User fromUser = userService.findById(item.getFromUser()).get();
			User toUser = userService.findById(item.getToUser()).get();

			BeanUtils.copyProperties(fromUser, fromResponse);
			BeanUtils.copyProperties(toUser, toResponse);
			BeanUtils.copyProperties(item, response);

			response.setFromUser(fromResponse);
			response.setToUser(toResponse);
			response.setProject(project);

			result.add(response);
		});

		return result;
	}

	private List<InviteResponse> combineList(List<InviteResponse> first, List<InviteResponse> second) {
		first.forEach(item -> second.add(item));
		return second;
	}
}
