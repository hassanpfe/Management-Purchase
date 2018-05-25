package mdp.users.services;

import mdp.login.model.Login;
import mdp.users.beans.User;

public interface IUserService {

	
	
	public abstract User validateUser(Login Login);
	public abstract User registerUser(User user);
}
