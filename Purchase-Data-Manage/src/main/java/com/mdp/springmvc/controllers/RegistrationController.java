package com.mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import antlr.Utils;

import com.mdp.beans.BonCommande;
import com.mdp.beans.BonCommandeRequest;
import com.mdp.beans.User;
import com.mdp.users.servicesImpl.UserServiceImpl;
import com.mdp.utilities.ServiceMdpHelper;


@Controller
public class RegistrationController {
	
	private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);
	//	  @Autowired
	//
	//	  public UserService userService;
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)

	public ModelAndView showRegister(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mav = new ModelAndView("register");
		
		mav.addObject("user", new User());

		return mav;

	}

	@RequestMapping(value = "/register/registerProcess", method = RequestMethod.POST)

	public ModelAndView addUser(HttpServletRequest request, HttpServletResponse response,

			@ModelAttribute("user") User user) {

		//userService.register(user);
		logger.debug("Objet reçu de la vue : {}",ServiceMdpHelper.convertObjectToJSON(user));
		UserServiceImpl serviceUser=new UserServiceImpl();
		serviceUser.registerUser(user);
		logger.debug("User Added");
		return new ModelAndView("welcome", "firstname", user.getFirstname());

	}

	@RequestMapping(value = "/bcValidate", method = RequestMethod.POST)

	public ModelAndView validateBC(HttpServletRequest request, HttpServletResponse response,

			@ModelAttribute("user") User user,@ModelAttribute("commande") BonCommandeRequest commandeRequest) {

		if(logger.isDebugEnabled()){
			
			logger.debug("Objet reçu de la vue : {}",ServiceMdpHelper.convertObjectToJSON(commandeRequest));
		}
		return new ModelAndView("welcome", "firstname", user.getFirstname());

	}
	
	
}
