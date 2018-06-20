<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Purchase Data Manage</title>
<link rel="stylesheet" href="../resources/bootstrap.min.css"
	type="text/css">
<!-- Latest compiled and minified CSS -->
<!-- link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> -->
<!-- Optional theme -->
<!--<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">-->

<!-- Latest Jquery -->
<!--<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
	type="text/javascript"></script>-->
<!-- Latest compiled and minified JavaScript -->
<!--<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
-->
</head>
<body>
	<jsp:include page="header.jsp" />
	<div class="container">
		<div class="row">
			<h1>Identification</h1>
		</div>
		<c:url value="/loginProcess" var="loginVar" />

		<form:form id="appointment-form" class="form-horizontal"
			modelAttribute="login" action="${loginVar}" method="POST">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2">
						<label for="username" class="control-label">Username: </label>
					</div>
					<div class="col-sm-3">
						<form:input name="username_input" path="username"
							class="form-control" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2">
						<label for="password" class="control-label">Password: </label>
					</div>
					<div class="col-sm-3">
						<form:input type="password" name="password_input" path="password"
							class="form-control" />
					</div>
				</div>
			</div>
			<button type="submit" id="btn-save" class="btn btn-primary">Login</button>

		</form:form>
	</div>
</body>
</html>