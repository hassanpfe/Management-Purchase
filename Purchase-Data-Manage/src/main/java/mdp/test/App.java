package mdp.test;

import mdp.persistence.HibernateUtil;
import mdp.users.beans.User;

import org.hibernate.Session;

public class App {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		 System.out.println("Maven + Hibernate + MySQL");
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        
	        session.beginTransaction();
	        User user = new User();
	        user.setId("id1");
	        user.setUsername("username1");
	        user.setPassword("password1");
	        user.setFirstname("firstname1");
	        user.setLastname("lastname1");
	        user.setEmail("email1");
	        user.setAddress("address1");
	        user.setPhone("phone1");
	    	user.setSex("sex1");
	    	user.setFonction("fonction1");
	        
	    	
	        session.save(user);
	        session.getTransaction().commit();

	}

}
