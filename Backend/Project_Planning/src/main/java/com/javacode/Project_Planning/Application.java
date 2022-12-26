package com.javacode.Project_Planning;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner run() {
		return args -> {
//			User user = service.findById("6399db00328f2627e0091a7f").get();
//			user.setAdmin(true);
//			
//			service.save(user);
		};
	}
}