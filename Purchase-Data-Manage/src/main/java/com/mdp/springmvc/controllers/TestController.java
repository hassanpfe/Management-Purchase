package com.mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mdp.beans.User;
import com.mdp.login.model.Login;




@Controller
public class TestController {
	
	@RequestMapping(value = "/test", method = {RequestMethod.GET,RequestMethod.POST})

	public ModelAndView showLogin(HttpServletRequest request, HttpServletResponse response, @ModelAttribute("login") Login login) {
		
		
//		User user=new User();
//		user.setFirstname("firstname");
//		user.setLastname("lastname");
//		user.setAddress("address");
//		user.setPassword("password");
//		user.setPhone("Phone");
		ModelAndView mav = new ModelAndView("userForm");
//		mav.addObject(user);

		return mav;
	}
	

}
