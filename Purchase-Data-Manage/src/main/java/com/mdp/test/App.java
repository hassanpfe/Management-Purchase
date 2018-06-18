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
	     //   user.setId("id0");
	        user.setUsername("username1");
	        user.setPassword("password1");
	        user.setFirstname("firstname1");
	        user.setLastname("lastname1");
	        user.setEmail("email1");
	        user.setAddress("address1");
	        user.setPhone("phone1");
	    	user.setSex("sex1");
	    	user.setFonction("fonction1");
	        
	        session.beginTransaction();
	        
	    	
	        session.save(user);
	        session.getTransaction().commit();

	}

}
