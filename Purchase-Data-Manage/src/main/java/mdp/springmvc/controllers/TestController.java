package mdp.springmvc.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mdp.login.model.Login;
import mdp.users.beans.User;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;




@Controller
public class TestController {
	
	@RequestMapping(value = "/test", method = {RequestMethod.GET,RequestMethod.POST})

	public ModelAndView showLogin(HttpServletRequest request, HttpServletResponse response) {
		
		
		User user=new User();
		user.setFirstname("firstname");
		user.setLastname("lastname");
		user.setAddress("address");
		user.setPassword("password");
		user.setPhone("Phone");
		ModelAndView mav = new ModelAndView("userform");
		

		return mav;
	}
	

}
