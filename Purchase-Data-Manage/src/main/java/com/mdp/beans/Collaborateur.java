package com.mdp.beans;


public class Collaborateur
{
  private int idCollaborateur;
  
  private String prenomCollaborateur;
  
  private String nomCollaborateur;
  
  private String fonctionCollaborateur;
  
  public Collaborateur(int id_collaborateur, String prenom_collaborateur, String nom_collaborateur, String fonction_collaborateur)
  {
    this.idCollaborateur = id_collaborateur;
    this.prenomCollaborateur = prenom_collaborateur;
    this.nomCollaborateur = nom_collaborateur;
    this.fonctionCollaborateur = fonction_collaborateur;
  }
  



  public Collaborateur() {}
  



  public int getId_collaborateur()
  {
    return this.idCollaborateur;
  }
  
  public void setId_collaborateur(int id_collaborateur) { this.idCollaborateur = id_collaborateur; }
  
  public String getPrenom_collaborateur() {
    return this.prenomCollaborateur;
  }
  
  public void setPrenom_collaborateur(String prenom_collaborateur) { this.prenomCollaborateur = prenom_collaborateur; }
  
  public String getNom_collaborateur() {
    return this.nomCollaborateur;
  }
  
  public void setNom_collaborateur(String nom_collaborateur) { this.nomCollaborateur = nom_collaborateur; }
  
  public String getFonction_collaborateur() {
    return this.fonctionCollaborateur;
  }
  
  public void setFonction_collaborateur(String fonction_collaborateur) { this.fonctionCollaborateur = fonction_collaborateur; }
}





