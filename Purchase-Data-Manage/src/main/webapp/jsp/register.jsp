<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<html lang="en">



<link rel="stylesheet" href="../resources/bootstrap.min.css"
	type="text/css">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Registration</title>
</head>
<body>
<jsp:include page="header.jsp" />
	<form:form id="regForm" modelAttribute="user" action="registerProcess"
		method="post">
		<br>
		<div class="row">
		
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Identifient</label>
						<div class="col-sm-5">
							<form:input path="Username" type="text" class="form-control "
								id="username" placeholder="username" />
				</div>
				</div>
				</div>
				<div class="row">
		
		<br>
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Mot de passe</label>
						<div class="col-sm-5">
							<form:input path="password" type="text" class="form-control "
								id="password" placeholder="password" />
				</div>
				</div>
				</div>
				
				<div class="row">
		
		<br>
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Nom</label>
						<div class="col-sm-5">
							<form:input path="Lastname" type="text" class="form-control "
								id="LastName" placeholder="LastName" />
				</div>
				</div>
				</div>
				
						<div class="row">
		
		<br>
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Prénom</label>
						<div class="col-sm-5">
							<form:input path="Firstname" type="text" class="form-control "
								id="Prenom" placeholder="Prenom" />
				</div>
				</div>
				</div>
				
				<div class="row">
		<br>
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Email</label>
						<div class="col-sm-5">
							<form:input path="Email" type="text" class="form-control "
								id="Email" placeholder="Email" />
				</div>
				</div>
				</div>
			
			
				
				<div class="row">
		<br>
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Adresse</label>
						<div class="col-sm-5">
							<form:input path="Address" type="text" class="form-control "
								id="Adresse" placeholder="Adresse" />
				</div>
				</div>
				</div>
				
				
				<div class="row">
		<br>
		
		<div class="col-sm-5 col-sm-offset-1">
		<label class="col-sm-6 control-label">Fonction</label>
						<div class="col-sm-5">
							<form:input path="Phone" type="text" class="form-control "
								id="Fonction" placeholder="Fonction" />
				</div>
				</div>
				</div>
			
				
				
				<div class="col-sm-5 col-sm-offset-1">
			    <button type="submit" id="register" class="btn btn-primary">Enregistrer</button>
				</div>
			
			
		
	</form:form>
</body>
</html>

