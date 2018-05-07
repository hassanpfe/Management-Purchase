package mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mdp.login.model.Login;
import mdp.users.beans.User;
import mdp.users.servicesImpl.UserServiceImpl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class LoginController {

	//	@Autowired

	//

	UserServiceImpl userService=new UserServiceImpl();

	@RequestMapping(value = "/login", method = RequestMethod.GET)

	public ModelAndView showLogin(HttpServletRequest request, HttpServletResponse response) {
		
		

		ModelAndView mav = new ModelAndView("login");
		Login login =new Login();
		mav.addObject(login);
		request.getRemoteAddr();

		return mav;
	}
	
	

	@RequestMapping(value = "/loginProcess", method = RequestMethod.POST)

	public ModelAndView loginProcess(HttpServletRequest request, HttpServletResponse response,

			@ModelAttribute("login") Login login) {

		ModelAndView mav = new ModelAndView();

		mav.addObject("firstname", login.getUsername());
		mav.addObject("password", login.getPassword());
		User user = userService.validateUser(login);

		if (null == user) {



			mav = new ModelAndView("login");

			mav.addObject("message", "Username or Password is wrong!!");


		} else {

			mav = new ModelAndView("welcome");
			/*
			 * 
			 * To DO
			 */

			mav.addObject("firstname", user.getFirstname());
		}

		return mav;

	}


}
