package com.mdp.beans;

public class Fournisseur
{
  private int Id_fournisseur;
  
  private String nomFournisseur;
  private String prenomFournisseur;
  private String mail;
  private int telephone;
  private String adresse;
  
  public Fournisseur(int id_fournisseur, String nom_fournisseur, String prenom_fournisseur, String mail, int telephone, String adresse)
  {
    this.Id_fournisseur = id_fournisseur;
    this.nomFournisseur = nom_fournisseur;
    this.prenomFournisseur = prenom_fournisseur;
    this.mail = mail;
    this.telephone = telephone;
    this.adresse = adresse;
  }
  



  public Fournisseur() {}
  



  public int getId_fournisseur()
  {
    return this.Id_fournisseur;
  }
  
  public void setId_fournisseur(int id_fournisseur) { this.Id_fournisseur = id_fournisseur; }
  
  public String getNom_fournisseur() {
    return this.nomFournisseur;
  }
  
  public void setNom_fournisseur(String nom_fournisseur) { this.nomFournisseur = nom_fournisseur; }
  
  public String getPrenom_fournisseur() {
    return this.prenomFournisseur;
  }
  
  public void setPrenom_fournisseur(String prenom_fournisseur) { this.prenomFournisseur = prenom_fournisseur; }
  
  public String getMail() {
    return this.mail;
  }
  
  public void setMail(String mail) { this.mail = mail; }
  
  public int getTelephone() {
    return this.telephone;
  }
  
  public void setTelephone(int telephone) { this.telephone = telephone; }
  
  public String getAdresse() {
    return this.adresse;
  }
  
  public void setAdresse(String adresse) { this.adresse = adresse; }
}





