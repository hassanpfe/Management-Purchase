<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<head>
<title>Spring MVC Form Handling Example</title>

<!-- Sources Bootstrap et JQuery -->
<!-- link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
-->


<link rel="stylesheet" href="resources/bootstrap.min.css" type="text/css">



<!-- link rel="stylesheet"
	href="resources/core/css/bootstrap.min.css"> -->


<!-- Optional theme -->
<!-- link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
 -->
<!-- Latest Jquery -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
	type="text/javascript"></script>

</head>
<nav class="navbar navbar-inverse navbar-static-top">
	<div class="container">
		<div class="navbar-header">
			<a href="<spring:url value="/"/>" class="navbar-brand">Purchase
				Data Manage</a>
		</div>
		<ul class="nav navbar-nav">
			<li><a href="<spring:url value="/services/"/>">NAV 1</a></li>
			<li><a href="<spring:url value="/addproduct"/>">AddProduct</a></li>
			<li><a href="<spring:url value="/loginProcess"/>">bc</a></li>
			<li><a href="<spring:url value="/login/"/>">Sign In</a></li>
		</ul>
	</div>
</nav>