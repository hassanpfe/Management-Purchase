package com.mdp.beans;

public class Famille
{
  private int idFamille;
  private int idFournisseur;
  private String designation;
  
  public Famille(int id_famille, int id_fournisseur, String designation)
  {
    this.idFamille = id_famille;
    this.idFournisseur = id_fournisseur;
    this.designation = designation;
  }
  


  public Famille() {}
  


  public int getId_famille()
  {
    return this.idFamille;
  }
  
  public void setId_famille(int id_famille) { this.idFamille = id_famille; }
  
  public int getId_fournisseur() {
    return this.idFournisseur;
  }
  
  public void setId_fournisseur(int id_fournisseur) { this.idFournisseur = id_fournisseur; }
  
  public String getDesignation() {
    return this.designation;
  }
  
  public void setDesignation(String designation) { this.designation = designation; }
}





