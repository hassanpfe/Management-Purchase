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

import com.mdp.beans.Article;
import com.mdp.beans.BonCommande;
import com.mdp.beans.LigneComande;
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

	@RequestMapping(value = "/addproduct", method = RequestMethod.GET)

	public ModelAndView ShowAddproduct(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView mav1 = new ModelAndView("AddProduct");

		mav1.addObject("article", new LigneComande());

		return mav1;

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

			@ModelAttribute("user") User user,@ModelAttribute("commande") BonCommande commandeRequest) {

		if(logger.isDebugEnabled()){

			logger.debug("Objet reçu de la vue : {}",ServiceMdpHelper.convertObjectToJSON(commandeRequest));
		}
		return new ModelAndView("welcome", "firstname", user.getFirstname());

	}

	@RequestMapping(value = "/addproduct/addProduct", method = RequestMethod.POST)

	public void addProduct(HttpServletRequest request, HttpServletResponse response,@ModelAttribute("commande") LigneComande commandeRequest) {

		ModelAndView mav1 = new ModelAndView();
		if(logger.isDebugEnabled()){

			logger.debug("Objet reçu de la vue : {}",ServiceMdpHelper.convertObjectToJSON(commandeRequest));
		}
		mav1.addObject("article", new LigneComande());

		

	}


}
