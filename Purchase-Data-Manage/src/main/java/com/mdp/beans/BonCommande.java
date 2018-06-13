package com.mdp.beans;

import java.util.Date;




public class BonCommande
{
	private int idBonCommande;
	private int idCollaborateur;
	private int idProjet;
	private String statut;
	private Date dateCommande;
	private Date dateLivraisonSouhaite;
	private String modePaiement;
	private int delaiPaiement;
	private String lieuLivraisonSouhaite;
	private double total;
	private double totalTtc;
	private String commentaire;

	public BonCommande(int idBonCommande, int idCollaborateur, int idProjet, String statut, Date dateCommande, Date dateLivraisonSouhaite, String modePaiement, int delaiPaiement, String lieuLivraisonSouhaite, double total, double totalTtc, String commentaire)
	{
		this.idBonCommande = idBonCommande;
		this.idCollaborateur = idCollaborateur;
		this.idProjet = idProjet;
		this.statut = statut;
		this.dateCommande = dateCommande;
		this.dateLivraisonSouhaite = dateLivraisonSouhaite;
		this.modePaiement = modePaiement;
		this.delaiPaiement = delaiPaiement;
		this.lieuLivraisonSouhaite = lieuLivraisonSouhaite;
		this.total = total;
		this.totalTtc = totalTtc;
		this.commentaire = commentaire;
	}



	public BonCommande() {}

	public int getIdBonCommande() {
		return idBonCommande;
	}

	public void setIdBonCommande(int idBonCommande) {
		this.idBonCommande = idBonCommande;
	}

	public int getIdCollaborateur() {
		return idCollaborateur;
	}

	public void setIdCollaborateur(int idCollaborateur) {
		this.idCollaborateur = idCollaborateur;
	}

	public int getIdProjet() {
		return idProjet;
	}

	public void setIdProjet(int idProjet) {
		this.idProjet = idProjet;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Date getDateCommande() {
		return dateCommande;
	}

	public void setDateCommande(Date dateCommande) {
		this.dateCommande = dateCommande;
	}

	public Date getDateLivraisonSouhaite() {
		return dateLivraisonSouhaite;
	}

	public void setDateLivraisonSouhaite(Date dateLivraisonSouhaite) {
		this.dateLivraisonSouhaite = dateLivraisonSouhaite;
	}

	public String getModePaiement() {
		return modePaiement;
	}

	public void setModePaiement(String modePaiement) {
		this.modePaiement = modePaiement;
	}

	public int getDelaiPaiement() {
		return delaiPaiement;
	}

	public void setDelaiPaiement(int delaiPaiement) {
		this.delaiPaiement = delaiPaiement;
	}

	public String getLieuLivraisonSouhaite() {
		return lieuLivraisonSouhaite;
	}

	public void setLieuLivraisonSouhaite(String lieuLivraisonSouhaite) {
		this.lieuLivraisonSouhaite = lieuLivraisonSouhaite;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public double getTotalTtc() {
		return totalTtc;
	}

	public void setTotalTtc(double totalTtc) {
		this.totalTtc = totalTtc;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}



}