<%@ page session="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">


<jsp:include page="header.jsp" />
<div class="container">


	<h1>Bon de Commande</h1>

	<br />

	<spring:url value="/users" var="userActionUrl" />

	<form:form class="form-horizontal" method="post"
		modelAttribute="commande" action="${userActionUrl}">

		<form:hidden path="id" />
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Numéro du BC</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="username">
				<div class="col-sm-5">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date Commande</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Acheteur</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="username">
				<div class="col-sm-5">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date Livraison
							Souhaitée</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Fonction</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Mode de paiement</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<h2>Détail du projet</h2>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Référence du projet</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="username">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Lieu de livraison
							souhaité</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Responsable projet</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date de paiement</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>

			<spring:bind path="username">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Mode de paiement</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<h2>Liste de articles</h2>
		<!--Ajout template Article -->
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Fournisseur</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<h2>Contact fournisseur</h2>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Portable</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>

			<spring:bind path="username">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Fixe</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Email</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>

			<spring:bind path="username">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Adresse</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total HT</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<br>
		<br>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total HT</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="username">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total TTC</label>
						<div class="col-sm-6">
							<form:input path="username" type="text" class="form-control "
								id="username" placeholder="username" />
							<form:errors path="username" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<spring:bind path="email">
			<div class="form-group ${status.error ? 'has-error' : ''}">
				<label class="col-sm-2 control-label">Email</label>
				<div class="col-sm-10">
					<form:input path="email" class="form-control" id="email"
						placeholder="Email" />
					<form:errors path="email" class="control-label" />
				</div>
			</div>
		</spring:bind>

		<spring:bind path="password">
			<div class="form-group ${status.error ? 'has-error' : ''}">
				<label class="col-sm-2 control-label">Password</label>
				<div class="col-sm-10">
					<form:password path="password" class="form-control" id="password"
						placeholder="password" />
					<form:errors path="password" class="control-label" />
				</div>
			</div>
		</spring:bind>

		<spring:bind path="password">
			<div class="form-group ${status.error ? 'has-error' : ''}">
				<label class="col-sm-2 control-label">confirm Password</label>
				<div class="col-sm-10">
					<form:password path="password" class="form-control" id="password"
						placeholder="password" />
					<form:errors path="password" class="control-label" />
				</div>
			</div>
		</spring:bind>





		<spring:bind path="sex">
			<div class="form-group ${status.error ? 'has-error' : ''}">
				<label class="col-sm-2 control-label">Sex</label>
				<div class="col-sm-10">
					<label class="radio-inline"> <form:radiobutton path="sex"
							value="M" /> Male
					</label> <label class="radio-inline"> <form:radiobutton path="sex"
							value="F" /> Female
					</label> <br />
					<form:errors path="sex" class="control-label" />
				</div>
			</div>
		</spring:bind>



		<!-- Custom Script, Spring map to model via 'name' attribute
		<div class="form-group">
			<label class="col-sm-2 control-label">Number</label>
			<div class="col-sm-10">
				<c:forEach items="${numberList}" var="obj">
					<div class="radio">
						<label> 
							<input type="radio" name="number" value="${obj}">${obj}
						</label>
					</div>
				</c:forEach>
			</div>
		</div>
 		-->





		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<c:choose>
					<c:when test="${userForm['new']}">
						<button type="submit" class="btn-lg btn-primary pull-right">Add</button>
					</c:when>
					<c:otherwise>
						<button type="submit" class="btn-lg btn-primary pull-right">Valider</button>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</form:form>

</div>

<!-- jsp:include page="../fragments/footer.jsp" /> -->

</body>
</html>