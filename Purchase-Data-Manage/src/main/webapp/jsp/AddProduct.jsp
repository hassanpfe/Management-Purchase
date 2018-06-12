<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>


<head>
<link rel="stylesheet" href="../resources/bootstrap.min.css"
	type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Article</title>
</head>


<body>
	<!-- jsp:include page="header.jsp" /> -->

	<form:form id="addProduct" class="form-horizontal"
		modelAttribute="article" action="addProduct" method="post">

		<br>
		<div class="row">

			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Famille</label>
				<div class="col-sm-5">
					<select class="form-control list-group" id="selFamille">
						<option>Humain</option>
						<option>Fourniture</option>

					</select>
				</div>
			</div>



			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">Remise</label>
				<div class="col-sm-5">
					<div>
						<label class="radio-inline"> <form:radiobutton
								path="remise" value="true" id="remiseOui" />Oui
						</label> <label class="radio-inline"> <form:radiobutton
								path="remise" value="false" id="remiseNon" />Non
						</label>
					</div>
				</div>
			</div>


		</div>
		<div class="row">

			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Article</label>
				<div class="col-sm-5">
					<select class="form-control" id="selArticle">
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
					<form:input path="remise" type="text" class="form-control "
						id="remise" placeholder="remise" />
				</div>
			</div>
		</div>
		<br>
		<div class="row">


			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 1</label>
				<div class="col-sm-5">
					<form:input path="designation1" type="text" class="form-control "
						id="designation1" placeholder="designation1" />
				</div>
			</div>
			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">Qunatitè</label>
				<div class="col-sm-5">
					<form:input path="quantite" type="text" class="form-control "
						id="Quantite" placeholder="Quantite" />
				</div>
			</div>
		</div>


		<br>
		<div class="row">


			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 2</label>
				<div class="col-sm-5">
					<form:input path="designation2" type="text" class="form-control "
						id="designation2" placeholder="designation2" />
				</div>
			</div>

			<div class="col-sm-5 ">
				<label class="col-sm-3 control-label">prix unitairé</label>
				<div class="col-sm-5">
					<form:input path="prixUnitaire" type="text" class="form-control "
						id="PrixUnitaire" placeholder="PrixUnitaire" />
				</div>
			</div>
		</div>

		<br>
		<div class="row">


			<div class="col-sm-5 col-sm-offset-1">
				<label class="col-sm-3 control-label">Désignation 3</label>
				<div class="col-sm-5">
					<form:input path="designation3" type="text" class="form-control "
						id="designation3" placeholder="designation3" />
				</div>
			</div>
		</div>

		<br>




	</form:form>
	<br>
	<div class="row">

		<div class="col-sm-4 col-sm-offset-2">
			<button id="btnAddProduct" class="btn btn-primary">Ajouter</button>
		</div>

	</div>
	<br>
	<div class="row">
		<div class="col-sm-10 col-sm-offset-1">
			<table class="table table-striped" id="tabArticles">
				<thead>
					<tr>
						<th>Famille</th>
						<th>Article</th>
						<th>Désignation</th>
						<th>Quantité</th>
						<th>Remise</th>
						<th>Prix Unitaire</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody id="tbody"></tbody>

			</table>
		</div>
	</div>



	<script
		src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
	<script src="<c:url value='../resources/static/js/app.js' />"></script>
	<script src="<c:url value='../resources/static/js/article.js'/>"></script>
	<script
		src="<c:url value='../resources/static/js/service/user_service.js' />"></script>
	<script
		src="<c:url value='../resources/static/js/controller/user_controller.js' />"></script>

</body>





</html>