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

	<form:form id="addProduct" class="form-horizontal" method="post">

		<br>
		<div class="row">

			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Famille</label>
				<div class="col-sm-5">
					<select class="form-control list-group" id="sel1">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
				</div>
			</div>



			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">Remise</label>
				<div class="col-sm-5">
					<div >
						<label class="radio-inline"><input type="radio" name="Remise">Oui</label>
					
						<label class="radio-inline"><input type="radio" name="Remise">Non</label>
					</div>
				</div>
			</div>


		</div>
		<div class="row">

			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Article</label>
				<div class="col-sm-5">
					<select class="form-control" id="sel1">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
				</div>
			</div>
			
			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">Valeur Remise</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="VRemise"
						placeholder="VRemise" />
				</div>
			</div>
		</div>
<br>
		<div class="row">

			
			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 1</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="designation1"
						placeholder="designation1" />
				</div>
			</div>
			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">Qunatitè</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="Quantite"
						placeholder="Quantite" />
				</div>
			</div>	
		</div>
		
		
		<br>
		<div class="row">


			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 2</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="designation2"
						placeholder="designation2" />
				</div>
			</div>
			
			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">prix unitairé</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="PrixUnitaire"
						placeholder="PrixUnitaire" />
				</div>
			</div>
		</div>

		<br>
		<div class="row">


			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 3</label>
				<div class="col-sm-5">
					<form:input type="text" class="form-control " id="designation3"
						placeholder="designation3" />
				</div>
			</div>
		</div>

		<br>



	

		<br>
		<div class="row">

<div class="col-sm-4 col-sm-offset-2">
			<button type="submit" id="register" class="btn btn-primary">Ajouter</button>
		</div>
			
		</div>
		<br>
		<div class="row">


			
		</div>

	</form:form>
</body>





</html>