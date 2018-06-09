package com.mdp.utilities;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mdp.springmvc.controllers.RegistrationController;

public class ServiceMdpHelper {

	private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);
	public static String convertObjectToJSON(final Object in) {

		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonInString = null;
		try {
			jsonInString = ow.writeValueAsString(in);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonInString;

	}
}
