/**
 * 
 */

//alert("link js ok");
var articles=[];

var request=[];
document.getElementById("btnAddProduct").addEventListener("click", function(){
	alert("link js button ok");
	var famille=document.getElementById("selFamille").value;
	var article=document.getElementById("selArticle").value;
	var qte=document.getElementById("Quantite").value;
	var prix=document.getElementById("PrixUnitaire").value;
	var designation={
		designation1:document.getElementById("designation1").value,
		designation2:document.getElementById("designation2").value,
		designation3:document.getElementById("designation3").value,
	}
	var remise=0;
	if(document.getElementById("remiseOui").checked){
		remise=document.getElementById("remise").value;
		
	}
	articles[0]={"famille":famille,
				"article":article,
				"designation":designation,
				"quantite":qte,
				"prix":prix,
				"remise":remise
				};
				
	window.console.log(articles);
	buildTable(articles);
});


document.getElementById("showAddArticle").addEventListener("click", function(){
	document.getElementById("divArticle").classList.remove("hide");
	alert("ok");
});


function buildTable(articles){
	var tbody=document.getElementById("tbody");
	for(var i=0;i<articles.length;i++){
		var tr=document.createElement("tr");
		
			var tdFamille=document.createElement("td");
			tdFamille.innerHTML=articles[i]["famille"];
			tr.appendChild(tdFamille);
			
			var tdArticle=document.createElement("td");
			tdArticle.innerHTML=articles[i]["article"];
			tr.appendChild(tdArticle);
			
			var tdDesignation=document.createElement("td");
			tdDesignation.innerHTML=articles[i]["designation"]["designation1"]+" "+articles[i]["designation"]["designation3"]+" "+articles[i]["designation"]["designation3"];
			tr.appendChild(tdDesignation);
			
			var tdQuantite=document.createElement("td");
			tdQuantite.innerHTML=articles[i]["quantite"];
			tr.appendChild(tdQuantite);
			
			var tdPrix=document.createElement("td");
			tdPrix.innerHTML=articles[i]["prix"];
			tr.appendChild(tdPrix);
			
			var tdRemise=document.createElement("td");
			tdRemise.innerHTML=articles[i]["remise"];
			tr.appendChild(tdRemise);
		
		
		tbody.appendChild(tr);
	}
}

