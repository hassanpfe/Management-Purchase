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
  private int total;
  private int totalTtc;
  private String commentaire;
  
  public BonCommande(int id_bon_commande, int id_collaborateur, int id_projet, String statut, Date date_commande, Date date_livraison_souhaite, String mode_paiement, int delai_paiement, String lieu_livraison_souhaite, int totale, int totale_ttc, String commentaire)
  {
    this.idBonCommande = id_bon_commande;
    this.idCollaborateur = id_collaborateur;
    this.idProjet = id_projet;
    this.statut = statut;
    this.dateCommande = date_commande;
    this.dateLivraisonSouhaite = date_livraison_souhaite;
    this.modePaiement = mode_paiement;
    this.delaiPaiement = delai_paiement;
    this.lieuLivraisonSouhaite = lieu_livraison_souhaite;
    this.total = totale;
    this.totalTtc = totale_ttc;
    this.commentaire = commentaire;
  }
  



  public BonCommande() {}
  


  public int getId_bon_commande()
  {
    return this.idBonCommande;
  }
  
  public void setId_bon_commande(int id_bon_commande) { this.idBonCommande = id_bon_commande; }
  
  public int getId_collaborateur() {
    return this.idCollaborateur;
  }
  
  public void setId_collaborateur(int id_collaborateur) { this.idCollaborateur = id_collaborateur; }
  
  public int getId_projet() {
    return this.idProjet;
  }
  
  public void setId_projet(int id_projet) { this.idProjet = id_projet; }
  
  public String getStatut() {
    return this.statut;
  }
  
  public void setStatut(String statut) { this.statut = statut; }
  
  public Date getDate_commande() {
    return this.dateCommande;
  }
  
  public void setDate_commande(Date date_commande) { this.dateCommande = date_commande; }
  
  public Date getDate_livraison_souhaite() {
    return this.dateLivraisonSouhaite;
  }
  
  public void setDate_livraison_souhaite(Date date_livraison_souhaite) { this.dateLivraisonSouhaite = date_livraison_souhaite; }
  
  public String getMode_paiement() {
    return this.modePaiement;
  }
  
  public void setMode_paiement(String mode_paiement) { this.modePaiement = mode_paiement; }
  
  public int getDelai_paiement() {
    return this.delaiPaiement;
  }
  
  public void setDelai_paiement(int delai_paiement) { this.delaiPaiement = delai_paiement; }
  
  public String getLieu_livraison_souhaite() {
    return this.lieuLivraisonSouhaite;
  }
  
  public void setLieu_livraison_souhaite(String lieu_livraison_souhaite) { this.lieuLivraisonSouhaite = lieu_livraison_souhaite; }
  
  public int getTotale() {
    return this.total;
  }
  
  public void setTotale(int totale) { this.total = totale; }
  
  public int getTotale_ttc() {
    return this.totalTtc;
  }
  
  public void setTotale_ttc(int totale_ttc) { this.totalTtc = totale_ttc; }
  
  public String getCommentaire() {
    return this.commentaire;
  }
  
  public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
}

