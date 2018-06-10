package com.mdp.beans;

import java.util.ArrayList;
import java.util.Date;

public class BonCommandeRequest {
	private int idBonCommande;
	private String acheteur;
	private String dateCommande;
	private String dateLivraisonSouhaite;
	private String fonction;
	private String modePaiement;
	private String referenceProjet;
	private String lieuLivraisonSouhaite;
	private String responsableProjet;
	private String datePaiement;
	private String modePaiementProj;
	private String fournisseur;
	private String portableFournisseur;
	private String fixeFournisseur;
	private String emailFournisseur;
	private String adresseFournisseur;
	private ArrayList article;
	private float totalHT;
	private float toralTTC;
	
	
	
	public BonCommandeRequest(){}
	
	public BonCommandeRequest(int idBonCommande, String acheteur,
			String dateCommande, String dateLivraisonSouhaite, String fonction,
			String modePaiement, String referenceProjet,
			String lieuLivraisonSouhaite, String responsableProjet,
			String datePaiement, String modePaiementProj, String fournisseur,
			String portableFournisseur, String fixeFournisseur,
			String emailFournisseur, String adresseFournisseur,
			ArrayList article, float totalHT, float toralTTC) {
		
		this.idBonCommande = idBonCommande;
		this.acheteur = acheteur;
		this.dateCommande = dateCommande;
		this.dateLivraisonSouhaite = dateLivraisonSouhaite;
		this.fonction = fonction;
		this.modePaiement = modePaiement;
		this.referenceProjet = referenceProjet;
		this.lieuLivraisonSouhaite = lieuLivraisonSouhaite;
		this.responsableProjet = responsableProjet;
		this.datePaiement = datePaiement;
		this.modePaiementProj = modePaiementProj;
		this.fournisseur = fournisseur;
		this.portableFournisseur = portableFournisseur;
		this.fixeFournisseur = fixeFournisseur;
		this.emailFournisseur = emailFournisseur;
		this.adresseFournisseur = adresseFournisseur;
		this.article = article;
		this.totalHT = totalHT;
		this.toralTTC = toralTTC;
	}

	public int getIdBonCommande() {
		return idBonCommande;
	}

	public void setIdBonCommande(int idBonCommande) {
		this.idBonCommande = idBonCommande;
	}

	public String getAcheteur() {
		return acheteur;
	}

	public void setAcheteur(String acheteur) {
		this.acheteur = acheteur;
	}

	public String getDateCommande() {
		return dateCommande;
	}

	public void setDateCommande(String dateCommande) {
		this.dateCommande = dateCommande;
	}

	public String getDateLivraisonSouhaite() {
		return dateLivraisonSouhaite;
	}

	public void setDateLivraisonSouhaite(String dateLivraisonSouhaite) {
		this.dateLivraisonSouhaite = dateLivraisonSouhaite;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}

	public String getModePaiement() {
		return modePaiement;
	}

	public void setModePaiement(String modePaiement) {
		this.modePaiement = modePaiement;
	}

	public String getReferenceProjet() {
		return referenceProjet;
	}

	public void setReferenceProjet(String referenceProjet) {
		this.referenceProjet = referenceProjet;
	}

	public String getLieuLivraisonSouhaite() {
		return lieuLivraisonSouhaite;
	}

	public void setLieuLivraisonSouhaite(String lieuLivraisonSouhaite) {
		this.lieuLivraisonSouhaite = lieuLivraisonSouhaite;
	}

	public String getResponsableProjet() {
		return responsableProjet;
	}

	public void setResponsableProjet(String responsableProjet) {
		this.responsableProjet = responsableProjet;
	}

	public String getDatePaiement() {
		return datePaiement;
	}

	public void setDatePaiement(String datePaiement) {
		this.datePaiement = datePaiement;
	}

	public String getModePaiementProj() {
		return modePaiementProj;
	}

	public void setModePaiementProj(String modePaiementProj) {
		this.modePaiementProj = modePaiementProj;
	}

	public String getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(String fournisseur) {
		this.fournisseur = fournisseur;
	}

	public String getPortableFournisseur() {
		return portableFournisseur;
	}

	public void setPortableFournisseur(String portableFournisseur) {
		this.portableFournisseur = portableFournisseur;
	}

	public String getFixeFournisseur() {
		return fixeFournisseur;
	}

	public void setFixeFournisseur(String fixeFournisseur) {
		this.fixeFournisseur = fixeFournisseur;
	}

	public String getEmailFournisseur() {
		return emailFournisseur;
	}

	public void setEmailFournisseur(String emailFournisseur) {
		this.emailFournisseur = emailFournisseur;
	}

	public String getAdresseFournisseur() {
		return adresseFournisseur;
	}

	public void setAdresseFournisseur(String adresseFournisseur) {
		this.adresseFournisseur = adresseFournisseur;
	}

	public ArrayList getArticle() {
		return article;
	}

	public void setArticle(ArrayList article) {
		this.article = article;
	}

	public float getTotalHT() {
		return totalHT;
	}

	public void setTotalHT(float totalHT) {
		this.totalHT = totalHT;
	}

	public float getToralTTC() {
		return toralTTC;
	}

	public void setToralTTC(float toralTTC) {
		this.toralTTC = toralTTC;
	}
	
	
}
