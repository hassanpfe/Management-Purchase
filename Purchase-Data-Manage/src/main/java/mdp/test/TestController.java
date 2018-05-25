/*package mdp.test;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mdp.users.servicesImpl.UserServiceImpl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class TestController {

	//	@Autowired

	//

	UserServiceImpl userService=new UserServiceImpl();

	@RequestMapping(value = "/test", method = RequestMethod.GET)

	public ModelAndView showLogin(HttpServletRequest request, HttpServletResponse response) {
		
		

		ModelAndView mav = new ModelAndView("testSideBar");
		

		return mav;
	}
	
	

	/*@RequestMapping(value = "/loginProcess", method = RequestMethod.POST)

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

			mav = new ModelAndView("welcome");
			
			System.out.println("firstname: "+user.getFirstname());
			System.out.println("password: "+user.getPassword());
			mav.addObject("firstname", user.getFirstname());
			mav.addObject("password", user.getPassword());
		}

		return mav;

	}


}*/
