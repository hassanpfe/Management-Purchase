package com.mdp.users.servicesImpl;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;

import com.mdp.beans.User;
import com.mdp.login.model.Login;
import com.mdp.persistence.HibernateUtil;
import com.mdp.users.services.IUserService;


public  class UserServiceImpl implements IUserService{

	@Autowired
	User user;
	public User validateUser(Login login) {
		// TODO Auto-generated method stub

		//user.setFirstname(login.getUsername());
		//user.setPassword(login.getPassword());
		/*
		 *
		 * Chercher l'utilisateur avec les infos données dans la base de données et le retourner
		 * retourner null si info erronées
		 */
		Session session = HibernateUtil.getSessionFactory().openSession();


		session.beginTransaction();


		user=(User)session.get(User.class, login.getUsername());
		session.getTransaction().commit();


		return user;
	}

	public User registerUser(User user) {
		// TODO Auto-generated method stub
		Session session = HibernateUtil.getSessionFactory().openSession();


		session.beginTransaction();


		session.save(user);
		session.getTransaction().commit();

		return null;
	}


}
