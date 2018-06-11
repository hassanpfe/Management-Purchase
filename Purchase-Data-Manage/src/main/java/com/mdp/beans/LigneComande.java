package com.mdp.beans;

public class LigneComande
{
	private int idBonCommande;
	private int idArticle;
	private int quantite;
	
	private int totale;
	
	private boolean  remise;
	private float prixUnitaire;
	private float valeurRemise;
	private String designation1;
	private String designation2;
	private String designation3;

	public LigneComande(int id_bon_commande, int id_article, int quantite, int totale,boolean remise, float valeurRemise,String designation1,String designation2,String designation3)
	{
		this.idBonCommande = id_bon_commande;
		this.idArticle = id_article;
		this.quantite = quantite;
		this.totale = totale;
		this.remise=remise;
		this.valeurRemise=valeurRemise;
		this.designation1=designation1;
		this.designation2=designation2;
		this.designation3=designation3;
	}




	public LigneComande() {}




	public int getId_bon_commande()
	{
		return this.idBonCommande;
	}

	public void setId_bon_commande(int id_bon_commande) { this.idBonCommande = id_bon_commande; }

	public int getId_article() {
		return this.idArticle;
	}

	public void setId_article(int id_article) { this.idArticle = id_article; }

	public int getQuantite() {
		return this.quantite;
	}

	public void setQuantite(int quantite) { this.quantite = quantite; }

	public int getTotale() {
		return this.totale;
	}

	public void setTotale(int totale) { this.totale = totale; }
}





