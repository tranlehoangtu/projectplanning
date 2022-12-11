package com.javacode.Project_Planning.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

		if (type.equals("to")) {
			result = insertRequest(service.findByToUserAndStatus(id, "pending"));
		}

		if (type.equals("from")) {
			result = combineList(insertRequest(service.findByFromUserAndStatus(id, "accept")),
					insertRequest(service.findByFromUserAndStatus(id, "refuse")));
		}

		return ResponseEntity.ok().body(result);
	}

	@PostMapping(value = "/invite")
	public ResponseEntity<List<InviteRequest>> invite(@RequestBody List<InviteRequest> invites) {

		List<InviteRequest> requests = new ArrayList<>();

		if (invites.size() > 0) {
			InviteRequest firstRequest = invites.get(0);

			User user = userService.findById(firstRequest.getFromUser()).get();
			user.getFavorites();

			for (int i = 0; i < user.getPrivates().size(); i++) {
				if (user.getPrivates().get(i).equals(firstRequest.getProjectId())) {
					user.getPublics().add(user.getPrivates().get(i));
					user.getPrivates().remove(i);
				}
			}

			for (int i = 0; i < user.getFavorites().size(); i++) {
				if (user.getFavorites().get(i).equals(firstRequest.getProjectId())) {
					user.getPublics().add(user.getFavorites().get(i));
					user.getFavorites().remove(i);
				}
			}

			userService.save(user);
		}

		invites.forEach(item -> {
			requests.add(service.insert(item));
		});

		return ResponseEntity.ok().body(requests);
	}

	@PutMapping(value = "/invite/update")
	public ResponseEntity<InviteResponse> update(@RequestBody InviteResponse invite) {

		if (invite.getStatus().equals("accept")) {

			Project project = invite.getProject();

			List<Project> projects = new ArrayList<>();
			String root = projectService.getRoot(project.getId());

			projectService.getChilds(root, projects);
			projects.add(project);

			User fromUser = userService.findById(invite.getFromUser().getId()).get();
			User toUser = userService.findById(invite.getToUser().getId()).get();

			toUser.getPublics().add(project.getId());

			switch (invite.getType()) {
			case "Full access":
				for (int i = 0; i < projects.size(); i++) {
					projects.get(i).getFullaccess().add(fromUser.getId());
					projects.get(i).getFullaccess().add(toUser.getId());

					projectService.save(projects.get(i));
				}
				break;

			case "Can edit":
				for (int i = 0; i < projects.size(); i++) {
					projects.get(i).getCanEdits().add(toUser.getId());
					projects.get(i).getCanEdits().add(fromUser.getId());
					projectService.save(projects.get(i));
				}

				break;

			case "Can comment":
				for (int i = 0; i < projects.size(); i++) {
					projects.get(i).getCanComments().add(fromUser.getId());
					projects.get(i).getCanComments().add(toUser.getId());
					projectService.save(projects.get(i));
				}
				break;

			case "Can view":
				for (int i = 0; i < projects.size(); i++) {
					projects.get(i).getCanView().add(fromUser.getId());
					projects.get(i).getCanView().add(toUser.getId());
					projectService.save(projects.get(i));
				}
				break;

			default:
				break;
			}

			UserResponse toResponse = new UserResponse();
			BeanUtils.copyProperties(toUser, toResponse);

			invite.setProject(project);
			invite.setToUser(toResponse);

		}

		InviteRequest request = service.findById(invite.getId()).get();
		request.setStatus(invite.getStatus());
		service.save(request);

		return ResponseEntity.ok().body(invite);
	}

	@DeleteMapping(value = "/invite/delete/{id}")
	public void delete(@PathVariable("id") String id) {
		service.findById(id).ifPresent(request -> service.deleteById(id));
	}

	private List<InviteResponse> insertRequest(List<InviteRequest> requests) {
		List<InviteResponse> result = new ArrayList<>();

		requests.forEach(item -> {

			Optional<Project> optional = projectService.findById(item.getProjectId());

			if (optional.isPresent()) {
				Project project = optional.get();

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
			}
		});
		
		return result;
	}

	private List<InviteResponse> combineList(List<InviteResponse> first, List<InviteResponse> second) {
		first.forEach(item -> second.add(item));
		return second;
	}
}
