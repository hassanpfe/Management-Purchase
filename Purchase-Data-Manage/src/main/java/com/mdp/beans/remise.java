package com.mdp.beans;
import java.util.Date;




public class remise
{
  private int Id_remise;
  private int valeur_remise;
  private int Id_fournisseur;
  private Date date_echeance;
  
  public remise(int id_remise, int valeur_remise, int id_fournisseur, Date date_echeance)
  {
    this.Id_remise = id_remise;
    this.valeur_remise = valeur_remise;
    this.Id_fournisseur = id_fournisseur;
    this.date_echeance = date_echeance;
  }
  


  public remise() {}
  


  public int getId_remise()
  {
    return this.Id_remise;
  }
  
  public void setId_remise(int id_remise) { this.Id_remise = id_remise; }
  
  public int getValeur_remise() {
    return this.valeur_remise;
  }
  
  public void setValeur_remise(int valeur_remise) { this.valeur_remise = valeur_remise; }
  
  public int getId_fournisseur() {
    return this.Id_fournisseur;
  }
  
  public void setId_fournisseur(int id_fournisseur) { this.Id_fournisseur = id_fournisseur; }
  
  public Date getDate_echeance() {
    return this.date_echeance;
  }
  
  public void setDate_echeance(Date date_echeance) { this.date_echeance = date_echeance; }
}





