<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>

<link rel="stylesheet" href="../resources/bootstrap.min.css"
	type="text/css">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>


<body>
<jsp:include page="header.jsp" />

  <form:form id="addProduct" method="post">
		
		
		<br>
		<div class="row">
		
		<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-6 control-label">Identifient</label>
				<div class="col-sm-5">
					<form:input path="username" type="text" class="form-control "
						id="username" placeholder="username" />
				</div>
			</div>
			
			
</form:form>
</body>




</html>