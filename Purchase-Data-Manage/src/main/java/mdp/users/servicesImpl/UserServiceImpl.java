package mdp.users.servicesImpl;

import mdp.login.model.Login;
import mdp.users.beans.User;
import mdp.users.services.IUserService;


public  class UserServiceImpl implements IUserService{

	public User validateUser(Login login) {
		// TODO Auto-generated method stub
		
		User user =new User();
		user.setFirstname(login.getUsername());
		/*
		 * 
		 * Chercher l'utilisateur avec les infos donn�es dans la base de donn�es et le retourner
		 * retourner null si info erron�es
		 */
		
		return user;
	}


}
