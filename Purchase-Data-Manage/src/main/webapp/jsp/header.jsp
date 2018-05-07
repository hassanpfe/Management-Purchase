<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
	<nav class="navbar navbar-inverse navbar-static-top">
		<div class="container">
			<div class="navbar-header">
				<a href="<spring:url value="/"/>" class="navbar-brand">Purchase Data Manage</a>
			</div>
			<ul class="nav navbar-nav">
				<li><a href="<spring:url value="/services/"/>">NAV 1</a></li>
				<li><a href="<spring:url value="/appointments/"/>">NAV 2</a></li>
				<li><a href="<spring:url value="/schedule/"/>">NAV 3</a></li>
				<li><a href="<spring:url value="/login/"/>">Sign In</a></li>
			</ul>
		</div>
	</nav>