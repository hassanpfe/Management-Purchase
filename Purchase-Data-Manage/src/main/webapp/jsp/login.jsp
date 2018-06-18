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
<link rel="stylesheet" href="../resources/login.css"
	type="text/css">
</head>
<body>
	<jsp:include page="header.jsp" />
	<div class="container">
		<div class="row">
			<h1>Identification</h1>
		</div>

		<c:url value="/j_spring_security_check" var="loginVar" />

		<form:form id="login-form" class="form-horizontal"
			modelAttribute="login" action="${loginVar}" method="POST">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2">
						<label for="username" class="control-label">Username: </label>
					</div>
					<div class="col-sm-3">
						<form:input name="j_username" id="username" path="username"
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
						<form:input type="password" id="password" name="j_password"
							path="password" class="form-control" />
					</div>
				</div>
			</div>
			<div class="row">
			<c:if test="${not empty error}">
				<div class="col-sm-2 col-sm-offset-2 error">${error}</div>
			</c:if>
			<c:if test="${not empty msg}">
				<div class="col-sm-2 col-sm-offset-2 msg">${msg}</div>
			</c:if>
			</div>
			<div class="row">
				<button type="submit" id="btn-save" class="btn btn-primary">Login</button>
			</div>
			<input type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
		</form:form>
	</div>
</body>
</html>