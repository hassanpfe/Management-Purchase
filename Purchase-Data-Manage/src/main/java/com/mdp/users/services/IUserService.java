package com.mdp.users.services;

import com.mdp.beans.User;
import com.mdp.login.model.Login;

public interface IUserService {

	
	
	public abstract User validateUser(Login Login);
	public abstract User registerUser(User user);
}
