<%@ page session="false"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<script src="<c:url value="/resources/main.js" />"></script>
</head>

<jsp:include page="header.jsp" />
<div class="container">


	<h1>Bon de Commande</h1>

	<br />

	<spring:url value="/bcValidate" var="userActionUrl" />

	<form:form class="form-horizontal" method="post"
		modelAttribute="bonCommandeRequest" action="${userActionUrl}">

		
		<div class="row">
			<spring:bind path="idBonCommande">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Numéro du BC</label>
						<div class="col-sm-6">
							<form:input path="idBonCommande" type="text"
								class="form-control " id="username" placeholder="idBonCommande" />
							<form:errors path="idBonCommande" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="dateCommande">
				<div class="col-sm-5">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date Commande</label>
						<div class="col-sm-6">
							<form:input path="dateCommande" type="text" class="form-control "
								id="dateCommande" dateCommande="dateCommande" />
							<form:errors path="dateCommande" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="acheteur">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Acheteur</label>
						<div class="col-sm-6">
							<form:input path="acheteur" readonly="true" type="text"
								class="form-control " id="acheteur" placeholder="acheteur" />
							<form:errors path="acheteur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="dateLivraisonSouhaite">
				<div class="col-sm-5">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date Livraison
							Souhaitée</label>
						<div class="col-sm-6">
							<form:input path="dateLivraisonSouhaite" type="text"
								class="form-control " id="dateLivraisonSouhaite"
								placeholder="dateLivraisonSouhaite" />
							<form:errors path="dateLivraisonSouhaite" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>

		<div class="row">
			<spring:bind path="modePaiement">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Mode de paiement</label>
						<div class="col-sm-6">
							<form:input path="modePaiement" type="text" class="form-control "
								id="modePaiement" placeholder="modePaiement" />
							<form:errors path="modePaiement" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<h2>Détail du projet</h2>
		<div class="row">
			<spring:bind path="referenceProjet">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Référence du projet</label>
						<div class="col-sm-6">
							<form:input path="referenceProjet" type="text"
								class="form-control " id="referenceProjet"
								placeholder="referenceProjet" />
							<form:errors path="referenceProjet" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
			<spring:bind path="lieuLivraisonSouhaite">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Lieu de livraison
							souhaité</label>
						<div class="col-sm-6">
							<form:input path="lieuLivraisonSouhaite" type="text"
								class="form-control " id="lieuLivraisonSouhaite"
								placeholder="lieuLivraisonSouhaite" />
							<form:errors path="lieuLivraisonSouhaite" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="responsableProjet">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Responsable projet</label>
						<div class="col-sm-6">
							<form:input path="responsableProjet" type="text"
								class="form-control " id="responsableProjet"
								placeholder="responsableProjet" />
							<form:errors path="responsableProjet" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="datePaiement">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Date de paiement</label>
						<div class="col-sm-6">
							<form:input path="datePaiement" type="text" class="form-control "
								id="datePaiement" placeholder="datePaiement" />
							<form:errors path="datePaiement" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>



		</div>
		<h2>Liste des articles</h2>
		<div class="row">

			<div class="col-sm-4 col-sm-offset-2">
				<button type="button" id="showAddArticle" class="btn btn-primary">Ajouter</button>
			</div>
			<div id="divArticle" class="hide">
			<jsp:include page="AddProduct.jsp" />
			</div>
		</div>

		<!--Ajout template Article -->
		<div class="row">
			<spring:bind path="fournisseur">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Fournisseur</label>
						<div class="col-sm-6">

							<select class="form-control list-group" id="sel1">
								<option></option>
								<option>Fourniture</option>

							</select>

							<form:input path="fournisseur" type="text" class="form-control "
								id="fournisseur" placeholder="fournisseur" />

							<form:errors path="fournisseur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<h2>Contact fournisseur</h2>
		<div class="row">
			<spring:bind path="portableFournisseur">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Portable</label>
						<div class="col-sm-6">
							<form:input path="portableFournisseur" type="text"
								class="form-control " id="portableFournisseur"
								placeholder="portableFournisseur" />
							<form:errors path="portableFournisseur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>

			<spring:bind path="fixeFournisseur">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Fixe</label>
						<div class="col-sm-6">
							<form:input path="fixeFournisseur" type="text"
								class="form-control " id="fixeFournisseur"
								placeholder="fixeFournisseur" />
							<form:errors path="fixeFournisseur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="emailFournisseur">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Email</label>
						<div class="col-sm-6">
							<form:input path="emailFournisseur" type="text"
								class="form-control " id="emailFournisseur"
								placeholder="emailFournisseur" />
							<form:errors path="emailFournisseur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>

			<spring:bind path="adresseFournisseur">
				<div class="col-sm-5 ">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Adresse</label>
						<div class="col-sm-6">
							<form:input path="adresseFournisseur" type="text"
								class="form-control " id="adresseFournisseur"
								placeholder="adresseFournisseur" />
							<form:errors path="adresseFournisseur" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="totalHT">
				<div class="col-sm-5 col-sm-offset-1">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total HT</label>
						<div class="col-sm-6">
							<form:input path="totalHT" type="text" class="form-control "
								id="totalHT" placeholder="totalHT" />
							<form:errors path="totalHT" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<br>
		<br>
		<div class="row">
			<spring:bind path="totalHT">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total HT</label>
						<div class="col-sm-6">
							<form:input path="totalHT" type="text" class="form-control "
								id="totalHT" placeholder="totalHT" />
							<form:errors path="totalHT" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>
		<div class="row">
			<spring:bind path="toralTTC">
				<div class="col-sm-6 col-sm-offset-3">
					<div class="form-group ${status.error ? 'has-error' : ''}">
						<label class="col-sm-6 control-label">Total TTC</label>
						<div class="col-sm-6">
							<form:input path="toralTTC" type="text" class="form-control "
								id="toralTTC" placeholder="toralTTC" />
							<form:errors path="toralTTC" class="control-label" />
						</div>
					</div>
				</div>
			</spring:bind>
		</div>



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
<script src="<c:url value='/resources/static/js/article.js'/>"></script>
<!-- jsp:include page="../fragments/footer.jsp" /> -->

</body>
</html>
