package com.mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mdp.beans.BonCommande;
import com.mdp.beans.LigneComande;
import com.mdp.beans.User;
import com.mdp.login.model.Login;
import com.mdp.users.servicesImpl.UserServiceImpl;

@Controller
public class LoginController {

	//	@Autowired

	//

	UserServiceImpl userService=new UserServiceImpl();
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

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

		System.out.println(login.getUsername()+" "+login.getPassword());
		User user = userService.validateUser(login);

		if (null == user) {



			mav = new ModelAndView("login");

			mav.addObject("message", "Username or Password is wrong!!");


		} else {

			mav = new ModelAndView("bc");
			/*
			 * 
			 * To DO
			 */
			
			BonCommande commandeRequest=new BonCommande();
			commandeRequest.setAcheteur("Hassan");
			System.out.println("firstname: "+user.getFirstname());
			System.out.println("password: "+user.getPassword());
			mav.addObject("firstname", user.getFirstname());
			mav.addObject("password", user.getPassword());
			mav.addObject("commande", user);
			mav.addObject("bonCommandeRequest", commandeRequest);
			mav.addObject("article", new LigneComande());
		}

		return mav;

	}


}
