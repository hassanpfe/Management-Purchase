package com.mdp.users.servicesImpl;

import com.mdp.beans.User;
import com.mdp.login.model.Login;
import com.mdp.users.services.IUserService;


public  class UserServiceImpl implements IUserService{

	public User validateUser(Login login) {
		// TODO Auto-generated method stub
		
		User user =new User();
		user.setFirstname(login.getUsername());
		user.setPassword(login.getPassword());
		/*
		 * 
		 * Chercher l'utilisateur avec les infos donn�es dans la base de donn�es et le retourner
		 * retourner null si info erron�es
		 */
		
		return user;
	}

	public User registerUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}


}
