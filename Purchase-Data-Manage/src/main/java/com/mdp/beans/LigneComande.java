package com.mdp.beans;

public class LigneComande
{
  private int idBonCommande;
  
  private int idArticle;
  private int quantite;
  private int totale;
  
  public LigneComande(int id_bon_commande, int id_article, int quantite, int totale)
  {
    this.idBonCommande = id_bon_commande;
    this.idArticle = id_article;
    this.quantite = quantite;
    this.totale = totale;
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





