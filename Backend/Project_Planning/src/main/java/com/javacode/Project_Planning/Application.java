package com.javacode.Project_Planning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

//	@Bean
//	CommandLineRunner run(ProjectService service) {
//		return args -> {
//
//			Project project = service.findById("63711211dc839545009bf0c7").get();
//			
//			List<Comment> comments = project.getComments();
//
//			Comment fComment = new Comment();
//			
//			fComment.setId(String.valueOf(comments.size()));
//			fComment.setUsername("Tran Le Hoang Tu");    
//			fComment.setContent("This is Third Comment");
//			fComment.setResolved(true);
//			
//			comments.add(fComment);
//			
//			project.setComments(comments);
//			service.save(project);
//		};
//	}

//	@Bean
//	CommandLineRunner run(UserService service) {
//		return args -> {
//			User user = new User();
//			user.setEmail("user@gmail.com");
//			user.setPassword("1");
//			user.setFullname("New User");
//			user.setLastProject("");
//			service.insert(user);
//		};
//	}

//	@Bean
//	CommandLineRunner run(LogoRepository repository) {
//		return args -> {
//			Logo customs = new Logo();
//			customs.setName("Customs");
//
//			repository.insert(customs);
//		};
//	}

//	@Bean
//	CommandLineRunner run(LogoRepository repository) {
//		return args -> {
//			LogoType icon = new LogoType();
//
//			icon.setName("Icons");
//			icon.setId("1");
//			icon.setContent(List.of(List.of(0, 0), List.of(0, 1), List.of(0, 2), List.of(0, 3), List.of(0, 4),
//					List.of(0, 5), List.of(0, 6)));
//
//			Logo icons = new Logo();
//			icons.setName("Icons");
//			icons.setContent(List.of(icon));
//			
//			repository.insert(icons);
//
//		};
//	}

//	@Bean
//	CommandLineRunner run(LogoRepository repository) {
//		return args -> {
//
//			LogoType recent = new LogoType();
//			recent.setName("Recent");
//			recent.setId("1");
//
//			LogoType people = new LogoType();
//			people.setName("People");
//			people.setContent(List.of(List.of(32, 52), List.of(32, 53), List.of(32, 54), List.of(32, 55),
//					List.of(32, 56), List.of(32, 57), List.of(32, 58), List.of(32, 59)));
//			people.setId("2");
//			
//			LogoType animalsAndNature = new LogoType();
//			animalsAndNature.setName("Animals and nature");
//			animalsAndNature.setId("3");
//			
//			LogoType foodAndDrink = new LogoType();
//			foodAndDrink.setName("Food and drink");
//			foodAndDrink.setId("4");
//			
//			LogoType activity = new LogoType();
//			activity.setName("Activity");
//			activity.setId("5");
//
//			LogoType travelsAndPlaces = new LogoType();
//			travelsAndPlaces.setName("Travels and places");
//			travelsAndPlaces.setId("6");
//			
//			LogoType objects = new LogoType();
//			objects.setName("Objects");
//			objects.setId("7");
//			
//			LogoType symbols = new LogoType();
//			symbols.setName("Symbols");
//			symbols.setId("8");
//
//			LogoType flags = new LogoType();
//			flags.setName("Flags");
//			flags.setId("9");
//
//			Logo emojis = new Logo();
//			emojis.setName("Emojis");
//			emojis.setContent(List.of(recent, people, animalsAndNature, foodAndDrink, activity, travelsAndPlaces,
//					objects, symbols, flags));
//			
//			repository.insert(emojis);
//		};
//	}
}
