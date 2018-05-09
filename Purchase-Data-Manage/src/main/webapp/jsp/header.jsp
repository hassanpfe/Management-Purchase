<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<head>
<title>Spring MVC Form Handling Example</title>

<!-- Sources Bootstrap et JQuery -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

<!-- Latest Jquery -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
	type="text/javascript"></script>
<!-- Latest compiled and minified JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js">
	
</script>
<!-- jsp:include page="../fragments/header.jsp" /> -->
<!-- spring:url value="hello.css" var="coreCss" /> -->
<!-- spring:url value="bootstrap.min.css" 
	var="bootstrapCss" />-->
<!-- link href="${bootstrapCss}" rel="stylesheet" />
<link href="${coreCss}" rel="stylesheet" /> -->
</head>
<nav class="navbar navbar-inverse navbar-static-top">
	<div class="container">
		<div class="navbar-header">
			<a href="<spring:url value="/"/>" class="navbar-brand">Purchase
				Data Manage</a>
		</div>
		<ul class="nav navbar-nav">
			<li><a href="<spring:url value="/services/"/>">NAV 1</a></li>
			<li><a href="<spring:url value="/appointments/"/>">NAV 2</a></li>
			<li><a href="<spring:url value="/schedule/"/>">NAV 3</a></li>
			<li><a href="<spring:url value="/login/"/>">Sign In</a></li>
		</ul>
	</div>
</nav>