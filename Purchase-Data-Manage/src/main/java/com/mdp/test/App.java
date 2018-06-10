package com.mdp.test;

import org.hibernate.Session;

import com.mdp.beans.User;
import com.mdp.persistence.HibernateUtil;

public class App {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		 System.out.println("Maven + Hibernate + MySQL");
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        User user = new User();
	        user.setId(1);
	        user.setUsername("username");
	        user.setPassword("password");
	        user.setFirstname("firstname");
	        user.setLastname("lastname");
	        user.setEmail("email1");
	        user.setAddress("address");
	        user.setPhone("06666666");
	    	user.setFonction("fonction");
	        
	        session.beginTransaction();
	        
	    	
	        session.save(user);
	        session.getTransaction().commit();

	}

}
