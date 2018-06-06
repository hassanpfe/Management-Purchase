package com.mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mdp.beans.BonCommande;
import com.mdp.beans.BonCommandeRequest;
import com.mdp.beans.User;


@Controller
public class RegistrationController {
	//	  @Autowired
	//
	//	  public UserService userService;

	@RequestMapping(value = "/register", method = RequestMethod.GET)

	public ModelAndView showRegister(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mav = new ModelAndView("register");

		mav.addObject("user", new User());

		return mav;

	}

	@RequestMapping(value = "/registerProcess", method = RequestMethod.POST)

	public ModelAndView addUser(HttpServletRequest request, HttpServletResponse response,

			@ModelAttribute("user") User user) {

		//userService.register(user);

		return new ModelAndView("welcome", "firstname", user.getFirstname());

	}

	@RequestMapping(value = "/bcValidate", method = RequestMethod.POST)

	public ModelAndView validateBC(HttpServletRequest request, HttpServletResponse response,

			@ModelAttribute("user") User user,@ModelAttribute("commande") BonCommandeRequest commandeRequest) {

		
		return new ModelAndView("welcome", "firstname", user.getFirstname());

	}
}
