package com.mdp.beans;

public class projet
{
  private int Id_projet;
  
  private String libelle_projet;
  
  private String description_projet;
  
  private int Id_collaborateur;
  
  public projet(int id_projet, String libelle_projet, String description_projet, int id_collaborateur)
  {
    this.Id_projet = id_projet;
    this.libelle_projet = libelle_projet;
    this.description_projet = description_projet;
    this.Id_collaborateur = id_collaborateur;
  }
  


  public projet() {}
  


  public int getId_projet()
  {
    return this.Id_projet;
  }
  
  public void setId_projet(int id_projet) { this.Id_projet = id_projet; }
  
  public String getLibelle_projet() {
    return this.libelle_projet;
  }
  
  public void setLibelle_projet(String libelle_projet) { this.libelle_projet = libelle_projet; }
  
  public String getDescription_projet() {
    return this.description_projet;
  }
  
  public void setDescription_projet(String description_projet) { this.description_projet = description_projet; }
  
  public int getId_collaborateur() {
    return this.Id_collaborateur;
  }
  
  public void setId_collaborateur(int id_collaborateur) { this.Id_collaborateur = id_collaborateur; }
}





