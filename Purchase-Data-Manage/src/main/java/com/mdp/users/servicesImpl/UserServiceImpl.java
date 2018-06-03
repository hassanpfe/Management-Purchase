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
		 * Chercher l'utilisateur avec les infos données dans la base de données et le retourner
		 * retourner null si info erronées
		 */
		
		return user;
	}

	public User registerUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}


}
