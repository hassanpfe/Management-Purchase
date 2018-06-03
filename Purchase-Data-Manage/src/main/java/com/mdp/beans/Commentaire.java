package com.mdp.beans;


public class Commentaire
{
  private int idBonCommande;
  
  private int idProfil;
  private String commentaire;
  
  public int getId_bon_commande()
  {
    return this.idBonCommande;
  }
  
  public Commentaire(int id_bon_commande, int id_profil, String commentaire) {
    this.idBonCommande = id_bon_commande;
    this.idProfil = id_profil;
    this.commentaire = commentaire;
  }
  



  public Commentaire() {}
  



  public void setId_bon_commande(int id_bon_commande)
  {
    this.idBonCommande = id_bon_commande;
  }
  
  public int getId_profil() { return this.idProfil; }
  
  public void setId_profil(int id_profil) {
    this.idProfil = id_profil;
  }
  
  public String getCommentaire() { return this.commentaire; }
  
  public void setCommentaire(String commentaire) {
    this.commentaire = commentaire;
  }
}





