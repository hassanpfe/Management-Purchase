package com.mdp.beans;


public class Article
{
	private int idArticle;

	private int idFournisseur;

	private int idFamille;
	private int idRemise;
	private String designation;
	private int prixUnitaire;

	public Article(int id_article, int id_fournisseur, int id_famille, int id_remise, String designation, int prix_unitaire)
	{
		this.idArticle = id_article;
		this.idFournisseur = id_fournisseur;
		this.idFamille = id_famille;
		this.idRemise = id_remise;
		this.designation = designation;
		this.prixUnitaire = prix_unitaire;
	}




	public Article() {}



	public int getId_article()
	{
		return this.idArticle;
	}

	public void setId_article(int id_article) { this.idArticle = id_article; }

	public int getId_fournisseur() {
		return this.idFournisseur;
	}

	public void setId_fournisseur(int id_fournisseur) { this.idFournisseur = id_fournisseur; }

	public int getId_famille() {
		return this.idFamille;
	}

	public void setId_famille(int id_famille) { this.idFamille = id_famille; }

	public int getId_remise() {
		return this.idRemise;
	}

	public void setId_remise(int id_remise) { this.idRemise = id_remise; }

	public String getDesignation() {
		return this.designation;
	}

	public void setDesignation(String designation) { this.designation = designation; }

	public int getPrix_unitaire() {
		return this.prixUnitaire;
	}

	public void setPrix_unitaire(int prix_unitaire) { this.prixUnitaire = prix_unitaire; }
}





