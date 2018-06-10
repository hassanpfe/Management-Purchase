package com.mdp.beans;

public class Profil
{
  private int Id_profil;
  
  private String nom_validateur;
  
  private String prenom_validateur;
  private String mail;
  private int identifiant;
  private char mdp;
  private String adresse;
  private String fonction;
  
  public Profil(int id_profil, String nom_validateur, String prenom_validateur, String mail, int identifiant, char mdp, String adresse, String fonction)
  {
    this.Id_profil = id_profil;
    this.nom_validateur = nom_validateur;
    this.prenom_validateur = prenom_validateur;
    this.mail = mail;
    this.identifiant = identifiant;
    this.mdp = mdp;
    this.adresse = adresse;
    this.fonction = fonction;
  }
  


  public Profil() {}
  


  public int getId_profil()
  {
    return this.Id_profil;
  }
  
  public void setId_profil(int id_profil) { this.Id_profil = id_profil; }
  
  public String getNom_validateur() {
    return this.nom_validateur;
  }
  
  public void setNom_validateur(String nom_validateur) { this.nom_validateur = nom_validateur; }
  
  public String getPrenom_validateur() {
    return this.prenom_validateur;
  }
  
  public void setPrenom_validateur(String prenom_validateur) { this.prenom_validateur = prenom_validateur; }
  
  public String getMail() {
    return this.mail;
  }
  
  public void setMail(String mail) { this.mail = mail; }
  
  public int getIdentifiant() {
    return this.identifiant;
  }
  
  public void setIdentifiant(int identifiant) { this.identifiant = identifiant; }
  
  public char getMdp() {
    return this.mdp;
  }
  
  public void setMdp(char mdp) { this.mdp = mdp; }
  
  public String getAdresse() {
    return this.adresse;
  }
  
  public void setAdresse(String adresse) { this.adresse = adresse; }
  
  public String getFonction() {
    return this.fonction;
  }
  
  public void setFonction(String fonction) { this.fonction = fonction; }
}





