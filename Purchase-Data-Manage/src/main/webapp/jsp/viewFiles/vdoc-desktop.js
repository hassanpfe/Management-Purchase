if (vdocDesktopLoaded==null)
{
	var vdocDesktopLoaded = true; // pour ne charger qu'une foi la constante
	var vdpPopupMenuScreenState = null;	
}

// --- Start - restore/save scroll
function vdpSaveScroll( target, formName, fieldName )
{
	try{ 
		if(typeof(target)=="string") target=document.getElementById(target);
  	document.forms[formName][fieldName].value = $(target).scrollLeft() + ";" + $(target).scrollTop();
	}catch(e){ alert( "save scroll failed : " + e );}
}

function vdpRestoreScroll( target, formName, fieldName )
{
	try
	{
		if(typeof(target)=="string") target=document.getElementById(target);
		var val = document.forms[formName][fieldName].value;
		$(target).scrollLeft(parseInt(val.substring(0,val.indexOf(";"))));
		$(target).scrollTop(parseInt(val.substring(val.indexOf(";")+1)));
	}
  catch(e)
  {
  }
}
//--- End - restore/save scroll

/**
* Intercepte les �v�nements du clavier d�clench�s depuis un contr�le du formulaire
* 
* @param formName le nom du formulaire
* @param event le pointeur sur l'�v�nement
*/
function vdpFormOnKeyDown( formName, event )
{
	if (event != null)
	{
		try
		{
		  var keyCode = event.keyCode || event.which || 0;
			if( keyCode == 13 && !vdpCommonsAutocompleteIsOpen && !vdpCommonsCKEditorIsModeSource) // 13 = touche ENTREE
			{
				stopPropagation(event);
				vdpPreventDefault(event);
				
			  if( formName!=null )
			  {
				  var form = document.forms[formName];
				  if( form!=null )
					{
						var defaultWid = form["DEFAULTWID"];
						if( defaultWid!=null )
						  defaultWid = defaultWid.value; 
						var defaultWvalue = form["DEFAULTWVALUE"];
						if( defaultWvalue!=null )
						  defaultWvalue = defaultWvalue.value;
						 
						if( defaultWid > "" )
						{
							vdpFireMessage( formName, defaultWid, defaultWvalue );
						}
					}
				}
			  return false;
			}
		}
		catch(e)
		{}
	}
}

/**
 * Gestion du click des formulaires UIVdoc 
 * @param formName
 * @param event
 */
function vdpOnClickForm(formName, event)
{
	vdpHideMessages();
	vdpCommonSelectCloseAllCombo();
}


//*****************************************************************************
//
//BEGIN - error messages
//
//*****************************************************************************
/**
* Array vdpMessagesErrors et vdpMessagesInfos:
* statut => Le statut du div d'erreur (0 : Non cr�e, 1: cr�e mais displya none, 2: cr�e et display block)
* message => Le message d'erreur
* navigatorId => l'id du navigator dont d�pend le div d'erreur
*/

/**
* Ajoute le message dans le tableau avec tous ses param�tres
* 
* @param typeMessage true message erreur, false message info
* @param idChamp l'id du champ concern�
* @param message le message � afficher
* @param navigatorId l'id du navigator
* @param scrollableIdElement l'id du parent scrollable si il y en a un
* @param isFocus booleen qui d�finit si l'�l�ment peut prendre le focus
* @returns
*/
function vdpAddMessage(typeMessage, idChamp, message, navigatorId, scrollableIdElement, isFocus) {
	if(typeMessage) {
		// TODO a voir pour les messages d'info g�nant
		if($("#" + idChamp) == null) {
			return null;
		}
		
		vdpMessagesErrors[idChamp] = new Array();
		
		// On met le statut � 0, cette fonction ajoute juste 
		vdpMessagesErrors[idChamp]['statut'] = 0;
		vdpMessagesErrors[idChamp]['message'] = message;
		vdpMessagesErrors[idChamp]['navigatorId'] = navigatorId;
		vdpMessagesErrors[idChamp]['isFocus'] = isFocus;
		vdpMessagesErrors[idChamp]['scrollableIdElement'] = scrollableIdElement;
	}
	else {
		vdpMessagesInfos[idChamp] = new Array();
	
		// On met le statut � 0, cette fonction ajoute juste 
		vdpMessagesInfos[idChamp]['statut'] = 0;
		vdpMessagesInfos[idChamp]['message'] = message;
		vdpMessagesInfos[idChamp]['isFocus'] = isFocus;
		vdpMessagesInfos[idChamp]['navigatorId'] = navigatorId;
		vdpMessagesInfos[idChamp]['scrollableIdElement'] = scrollableIdElement;
	}
}

function vdpMessageCleanBeforePost(typeMessage, idChamp)
{
	var prefix = prefixIdChampInfo;
	if(typeMessage)
		prefix = prefixIdChampError;
	
	var $fullSelector = $("#" + prefix + idChamp);
	
	if($fullSelector != null && $fullSelector.length > 0)
		$fullSelector.remove();
}

var vdpMessageseventContext = "scroll";

/**
* Construit les messages et bind les �v�nements de scroll
* 
* @param boolean typeMessage true message erreur, false message info
* @param String idChamp
*/
function vdpShowMessage(typeMessage, idChamp) {
	var navigatorId = null;
	// Cas des messages d'erreurs
	if(typeMessage && vdpMessagesErrors[idChamp] != null) {
		if(vdpMessagesErrors[idChamp]['statut'] == 0) {
			buildDivVdpErrorMessage(true, idChamp);
			vdpMessagesErrors[idChamp]['statut'] = 1; // On affiche le champ
		}
	}
	else if (!typeMessage && vdpMessagesInfos[idChamp] != null) {
		if(vdpMessagesInfos[idChamp]['statut'] == 0) {
			buildDivVdpErrorMessage(false, idChamp);
			vdpMessagesInfos[idChamp]['statut'] = 1;
		}
	}
	
	var idNavigator = null;
	var scrollableIdElement = null;
	if(typeMessage) {
		idNavigator = vdpMessagesErrors[idChamp]['navigatorId'];
		scrollableIdElement = vdpMessagesErrors[idChamp]['scrollableIdElement'];
	}
	else {
		idNavigator = vdpMessagesInfos[idChamp]['navigatorId'];
		scrollableIdElement = vdpMessagesInfos[idChamp]['scrollableIdElement'];
	}
	
	if( idNavigator != null && ( vdpMessageErrorInfoBindScroll[idNavigator] == undefined || vdpMessageErrorInfoBindScroll[idNavigator] == null ) )
	{
		var selectorScrollableElement = null;
		if( scrollableIdElement != null )
			selectorScrollableElement = $("#" + scrollableIdElement);
		else selectorScrollableElement = $(window);
		
		vdpMessageErrorInfoBindScroll[idNavigator] = selectorScrollableElement;
		vdpMessageErrorInfoBindScroll[idNavigator].unbind("scroll.hideMessage").bind("scroll.hideMessage", function (event) {
			vdpMessagesEventScroll( event );
		});
	}
}

function vdpMessagesEventScroll(event) {
	if(vdpMessageseventContext == 'scroll') {
		vdpScrollResizeWindowMessages();
	}
	else {
		vdpMessageseventContext = "scroll";
	}
}

/**
* Cache les messages
*/
function vdpScrollResizeWindowMessages() {
	// On cache tous les messages d'erreur et d'info lorsque l'on scroll ou que l'on redimensionne
	vdpHideMessages();
}

/**
* Construit le message d'erreur ou d'info
* 
* @param typeMessage true message erreur, false message info
* @param idChamp
*/
function buildDivVdpErrorMessage(typeMessage, idChamp) {
	if(typeMessage) {
		prefix = prefixIdChampError;
		classGlobalMessage = "vui-context-message";
		classLabelMessage = "vui-context-error";
		classDirectionFlecheBasGauche = "vui-context-message-ne";
		classDirectionFlecheBasDroite = "vui-context-message-nw";
		classMinified = "vui-error-indicator";
		message = vdpMessagesErrors[idChamp]['message'];
		isFocus = vdpMessagesErrors[idChamp]['isFocus'];
	}
	else {
		prefix = prefixIdChampInfo;
		classGlobalMessage = "vui-context-message";
		classLabelMessage = "vui-context-info";
		classDirectionFlecheBasGauche = "vui-context-message-ne";
		classDirectionFlecheBasDroite = "vui-context-message-nw";
		classMinified = "vui-info-indicator";
		message = vdpMessagesInfos[idChamp]['message'];
		isFocus = vdpMessagesInfos[idChamp]['isFocus'];
	}
	
	var selector = $("#" + prefix + idChamp);
	if(selector.length  <= 0)
	{
		var selectorBody = $("body");
		// Vue compl�te de l'erreur
		selectorBody.append('<div id="'+ prefix + idChamp + '"></div>');
		selector = $("#" + prefix + idChamp);
	}
	
	selector.empty();
	var selectorInputFieldParent = $("#" + idChamp);
	if(typeMessage) {
		vdpMessagesErrors[idChamp]['selectorFull'] = selector;
		vdpMessagesErrors[idChamp]['selectorInput'] = selectorInputFieldParent;
	}
	else {
		vdpMessagesInfos[idChamp]['selectorFull'] = selector;
		vdpMessagesInfos[idChamp]['selectorInput'] = selectorInputFieldParent;
	}
	
	
	selector.addClass(classGlobalMessage)
					.addClass(classLabelMessage)
					.addClass(classDirectionFlecheBasGauche)
					.append('<ul><li><label for="'+idChamp+'">' + message + '</label></li></ul>')
					.append('<span class="vui-arrow-top"><span>&#x25ba;</span></span>')
					.append('<span class="vui-arrow-bottom"><span>&#x25ba;</span></span>')
					.hide();
	
	// Le fonctionnel de cacher le minified est uniquement pour les messages d'erreurs
	if(typeMessage) {
		selectorDivMinified = $("#" + prefixIdChampError + idChamp + "_minified");
		vdpMessagesErrors[idChamp]['selectorMini'] = selectorDivMinified;
		
		if(isFocus) {
			selectorDivMinified.click(function(event) {
				vdpMessagesErrors[idChamp]['selectorInput'].focus();
				stopPropagation(event);
				vdpPreventDefault(event);
			});
		}
		else {
			selectorDivMinified.click(function(event) {
				vdpShowFullMessage( idChamp, false );
				stopPropagation(event);
				vdpPreventDefault(event);
			});
		}
	}
	else {
		// Pour les messages d'info le minified est toujours affich�
		selectorDivMinified = $("#" + prefixIdChampInfo + idChamp + "_minified");
		if(selectorDivMinified.length) {
			vdpMessagesInfos[idChamp]['selectorMini'] = selectorDivMinified;
			selectorDivMinified.click(function(event) {
				vdpShowFullMessage( idChamp, true );
				stopPropagation(event);
				vdpPreventDefault(event);
			});
		}
	}
}

/**
* Calcul les marges pour placer les messages
* 
* @param selectorInputFieldParent l'input relatif au message
* @param selector le div du message en lui m�me
*/
function calculatePositionVdpFullMessages(typeMessage, selectorInputFieldParent, selector, selectorMini) {
	if(selector == null || selectorInputFieldParent == null || selectorInputFieldParent.offset() == null ) {
		return;
	}
	
	var classDirectionFlecheBasGauche = "vui-context-message-ne";
	var classDirectionFlecheBasDroite = "vui-context-message-nw";
	var classDirectionFlecheHautGauche = "vui-context-message-se";
	var classDirectionFlecheHautDroite = "vui-context-message-sw";
	
	// On supprime toutes les class des fl�ches, elle sera plac�e plus bas dans la fonction
	selector.removeClass(classDirectionFlecheBasGauche);
	selector.removeClass(classDirectionFlecheBasDroite);
	selector.removeClass(classDirectionFlecheHautGauche);
	selector.removeClass(classDirectionFlecheHautDroite);
	
	// On remet le top et le left � 0 pour refaire les calculs
	selector.css("top", "0px");
	selector.css("left", "0px");
	
	// Infos du parent
	var parentLeft = selectorInputFieldParent.offset().left;
	var parentTop = selectorInputFieldParent.offset().top;
	var parentHeight = selectorInputFieldParent.height();
	var parentWidth = selectorInputFieldParent.width();
	
	// Infos de la fenetre
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var windowScrollTop = $(window).scrollTop();
	var windowScrollLeft = $(window).scrollLeft();		
	
	// Infos message qui va �tre affich�
	var widthMessage = selector.width();
	selector.css("width", widthMessage + "px"); // fix IE si on ne fixe pas la width sur le message les calculs ne sont pas bon dans certains cas (IE ne calcule pas le retour � la ligne dans le height du message comme il est pas encore affich�)
	var heightMessage = selector.height();
	
	// D�callage de la fl�che par rapport au message complet
	var arrowLeft = 10;
	// Haut et bas m�me taille
	var widthFleche = selector.find(".vui-arrow-top").width() + arrowLeft;
	var heightFleche = selector.find(".vui-arrow-top").height() + 2;
	
	// Valeurs par d�faut si on arrive � se placer nul part on met le message en haut � droite
	var newLeft = parentLeft + parentWidth - widthFleche;
	var newTop = parentTop - heightMessage - heightFleche;
	// Bool�en pour connaitre le placement de la fl�che
	var isTop = true;
	var isRight = true;
	var isBottom = false;
	var isLeft = false;
	
	// Cas du message � droite
	if((parentLeft + parentWidth + widthMessage - widthFleche) <= (windowWidth + windowScrollLeft)) {
		newLeft = parentLeft + parentWidth - widthFleche;
		isRight = true;
		isLeft = false;
	}
	// Cas du message � gauche
	else if((parentLeft + parentWidth - widthMessage + arrowLeft) > windowScrollLeft) {
		newLeft = parentLeft - widthMessage + parentWidth + arrowLeft;
		isRight = false;
		isLeft = true;
	}
	
	// Cas ou le message est affich� en haut
	if(windowScrollTop < (parentTop - heightMessage - heightFleche)) {
		newTop = parentTop - heightMessage - heightFleche;
		isTop = true;
		isBottom = false;
	}
	// Cas du message en bas
	else if((windowScrollTop + windowHeight) >= (parentTop + parentHeight + heightMessage + heightFleche)) {
		newTop = parentTop + parentHeight + heightFleche;
		isTop = false;
		isBottom = true;
	}
	
	if(!typeMessage && selectorMini != null) {
		var halfWidth = selectorMini.width() / 2;
		newLeft += halfWidth - 2;
	}
	
	selector.css({ "top" : newTop + "px" , "left": newLeft + "px" });
	
	if(isTop && isRight) {
		selector.addClass(classDirectionFlecheBasGauche);
	}
	else if(isTop && isLeft) {
		selector.addClass(classDirectionFlecheBasDroite);
	}
	else if(isBottom && isRight) {
		selector.addClass(classDirectionFlecheHautGauche);
	}
	else if(isBottom && isLeft) {
		selector.addClass(classDirectionFlecheHautDroite);
	}
	
	// Fix IE9 les deux fl�ches �taient visibles sinon on ne cache pas les spans
	if(isTop) {
		selector.find("span.vui-arrow-top").hide();
		selector.find("span.vui-arrow-bottom").show();
	}
	else {
		selector.find("span.vui-arrow-top").show();
		selector.find("span.vui-arrow-bottom").hide();
	}
}

/**
* Affiche le message d'erreur, ou le message d'info si il n'y a pas d'erreur
* 
* @param idChamp l'id du champ concern�
* @param showInfo booleen forcant l'affichage du message d'info m�me si il y a une erreur
*/
function vdpShowFullMessage(idChamp, isContextHelpMessage) {
	vdpHideMessages();
	var selectorDivFull = null;
	var selectorInputFieldParent = null;
	var selectorMini = null;
	var isErrorMessage;
	
	if(isContextHelpMessage) {
		// Cas ou on vient d'un click sur une icone helpMessage on place le message par rapport � l'icone
		isErrorMessage = false;
		selectorInputFieldParent = vdpMessagesInfos[idChamp]['selectorMini'];
		selectorDivFull = vdpMessagesInfos[idChamp]['selectorFull'];
		selectorMini = vdpMessagesInfos[idChamp]['selectorMini'];
		vdpMessagesInfos[idChamp]['statut'] = 2;
	}
	else if(vdpMessagesErrors[idChamp] != null) {
		vdpMessagesErrors[idChamp]['statut'] = 2;
		isErrorMessage = true;
		selectorDivFull = vdpMessagesErrors[idChamp]['selectorFull'];
		selectorMini = vdpMessagesErrors[idChamp]['selectorMini'];
		selectorInputFieldParent = vdpMessagesErrors[idChamp]['selectorInput'];
	}
	else if(vdpMessagesInfos[idChamp] != null) {
		vdpMessagesInfos[idChamp]['statut'] = 2;
		isErrorMessage = false;
		selectorDivFull = vdpMessagesInfos[idChamp]['selectorFull'];
		selectorMini = vdpMessagesInfos[idChamp]['selectorMini'];
		selectorInputFieldParent = vdpMessagesInfos[idChamp]['selectorInput'];
	}
	else {
		return false;
	}
	
	// Calcul des positionnements
	calculatePositionVdpFullMessages( isErrorMessage, selectorInputFieldParent, selectorDivFull, selectorMini );
	
	selectorDivFull.show();
	
	if(isErrorMessage) {
		var selectorDivMinified = vdpMessagesErrors[idChamp]['selectorMini'];
		selectorDivMinified.hide();
	}
}

/**
* Affiche la vue minimis�e de l'erreur et cache la vue compl�te uniquement pour les messages d'erreur
* 
* @param idChamp l"id du champ
*/
function vdpShowMinifiedMessage(idChamp) {
	if(vdpMessagesErrors[idChamp] != null) {
		vdpMessagesErrors[idChamp]['statut'] = 1;
	}
	else {
		return false;
	}
	
	selectorDivFull = vdpMessagesErrors[idChamp]['selectorFull'];
	selectorDivFull.hide();
	
	selectorDivMinified = vdpMessagesErrors[idChamp]['selectorMini'];
	selectorDivMinified.show();
}

/**
* Cache tous les messages d'info et d'erreur
*/
function vdpHideMessages() {
	// On cache les messages d'erreur
	for(idChamp in vdpMessagesErrors) {
		if(vdpMessagesErrors[idChamp]['statut'] == 2) {
			vdpShowMinifiedMessage(idChamp);			
		}
	}
	
	// On cache les messages d'info
	for(idChamp in vdpMessagesInfos) {
		if(vdpMessagesInfos[idChamp]['statut'] == 2) {
			var selectorFull = vdpMessagesInfos[idChamp]['selectorFull'];
			selectorFull.hide();			
		}
	}
}

/**
* Supprime tous les messages d'erreur et d'info concernant le navigator pass� en param�tre
* 
* @param navigatorId l'id du navigateur
*/
function vdpClearMessages(navigatorId) {
	for(idChamp in vdpMessagesErrors) {		
		if(vdpMessagesErrors[idChamp]['navigatorId'] == navigatorId) {
			vdpMessagesErrors[idChamp]['selectorFull'].remove();
			delete vdpMessagesErrors[idChamp];
			if(vdpMessageErrorInfoBindScroll[navigatorId] != undefined && vdpMessageErrorInfoBindScroll[navigatorId] != null ) {
				if(vdpMessageErrorInfoBindScroll[navigatorId].lenght > 0)
					vdpMessageErrorInfoBindScroll[navigatorId].unbind("scroll.hideMessage");
				delete vdpMessageErrorInfoBindScroll[navigatorId];
			}
		}
	}
	
	for(idChamp in vdpMessagesInfos) {
		if(vdpMessagesInfos[idChamp]['navigatorId'] == navigatorId) {
			vdpMessagesInfos[idChamp]['selectorFull'].remove();
			delete vdpMessagesInfos[idChamp];
			if(vdpMessageErrorInfoBindScroll[navigatorId] != undefined && vdpMessageErrorInfoBindScroll[navigatorId] != null ) {
				if(vdpMessageErrorInfoBindScroll[navigatorId].lenght > 0)
					vdpMessageErrorInfoBindScroll[navigatorId].unbind("scroll.hideMessage");
				delete vdpMessageErrorInfoBindScroll[navigatorId];
			}
		}
	}	
}

/**
* G�re la prise de focus sur le champ
* 
* @param idChamp
*/
function vdpMessageFocusField(idChamp) {
	vdpShowFullMessage( idChamp, false );
}

/**
* G�re le blur sur le champ
*/
function vdpMessageUnfocus() {
vdpHideMessages();
}

function vdpMessageSetFocusOnField(idChamp) {
	var isFocus;
	var idScrollableElement;
	var inputParent;
	var selectorDivFull;
	
	if(vdpMessagesErrors[idChamp] != null && vdpMessagesErrors[idChamp] != undefined) {
		isFocus = vdpMessagesErrors[idChamp]['isFocus'];
		idScrollableElement = vdpMessagesErrors[idChamp]['scrollableIdElement'];
		inputParent = vdpMessagesErrors[idChamp]['selectorInput'];
		selectorDivFull = vdpMessagesErrors[idChamp]['selectorFull'];
	}
	else if(vdpMessagesInfos[idChamp] != null && vdpMessagesInfos[idChamp] != undefined) {
		isFocus = vdpMessagesInfos[idChamp]['isFocus'];
		idScrollableElement = vdpMessagesInfos[idChamp]['scrollableIdElement'];
		inputParent = vdpMessagesInfos[idChamp]['selectorInput'];
		selectorDivFull = vdpMessagesInfos[idChamp]['selectorFull'];
	}
	else {
		$("#" + idChamp).focus();
		return;
	}
	
	if(inputParent.length > 0) {
		if(isFocus)
			inputParent.focus();
		else {
			var scrollable;
			var scrollableTop = 0;
			var scrollableBottom = 0;
			var scrollTop = null;
			
			var inputParentTop = inputParent.offset().top;
			var inputParentBottom = inputParentTop + inputParent.height();
			var selectorDivFullHeight = selectorDivFull.outerHeight();
			
			if(idScrollableElement != null) {
				scrollable = $("#" + idScrollableElement);
				scrollableTop = scrollable.offset().top;
				scrollableBottom = scrollableTop + scrollable.height();
				var scrollableHeight = scrollable.height();
				
				if( ( inputParentTop - selectorDivFullHeight ) < scrollableTop )
					scrollTop = inputParentTop - ( scrollableTop - scrollable.scrollTop() ) - selectorDivFullHeight;
				else if( inputParentBottom > scrollableBottom )
					scrollTop = ( inputParentBottom - scrollableTop + scrollable.scrollTop() ) - scrollableHeight;
			}
			else {
				scrollable = $(window);
				scrollableTop = scrollable.scrollTop();
				var scrollableHeight = scrollable.height();
				scrollableBottom = scrollableTop + scrollableHeight;
				
				if( ( inputParentTop - selectorDivFullHeight ) < scrollableTop )
						scrollTop = inputParentTop - selectorDivFullHeight;
				else if( inputParentBottom > scrollableBottom )
					scrollTop = inputParentBottom - scrollableHeight;
			}

			if( scrollTop != null )
				scrollable.scrollTop(scrollTop);
		}
		vdpMessageseventContext = "triggerScroll"; // Permet de ne pas executer l'event de scroll qui va �tre d�clench� par le scrollTop()
		vdpShowFullMessage( idChamp, false );
	}
}

//*****************************************************************************
//
//End - error messages
//
//*****************************************************************************

//*****************************************************************************
//
// Start - popupmenu
//
//*****************************************************************************
function showPopupMenu(src, caller, event)
{
	var menu = $('#popup-menu');
	var src = $('#'+src);
	
	// On vide et cache le menu pour repartir de 0 pour les calculs
	hidePopupMenu();
	
	menu.html(src.html());
	menu.addClass(src.attr('rel')); // La class css cible est dans le rel
	
	showPopupMenuInternal(menu, $("#" + caller ));
	
	if(event)
		stopPropagation(event); // Pour arr�ter le onclick (cas de l'image)
}

function showPopupScreen(src, caller, idForm, hidden)
{
	hidePopupMenu();
	vdpPopupMenuScreenState = hidden;
	
	var menu = $('#' + src);
	var popupHandler = $("#popup-menu");
	popupHandler.bind( "click.stopPopupPart", function(event) {
		stopPropagation(event);
	});
	
	var $popupForm = $("<form />");
	$popupForm.attr("id", idForm + "_popup_menu");
	$popupForm.unbind().bind("keydown", function(event) {
		vdpFormOnKeyDown(idForm, event);
	});
	
	$popupForm.append(menu.html());
	
	menu.empty();
	popupHandler.empty().removeClass().addClass(menu.attr("rel")).append($popupForm);
	popupHandler.attr("rel", src);
	
	showPopupMenuInternal(popupHandler, $('#' + caller));
	
	$hidden = $("#" + hidden);
	$hidden.val( src );// On sauvegarde l'id du popupmenu
}

function focusFirstFieldPopupScreen( idForm )
{
	var popupHandler = $("#popup-menu");
	if( popupHandler != null && popupHandler.length > 0)
	{
		var inputFilter = $(":tabbable:input[type='text']:first", popupHandler.find("form[id='"+idForm + "_popup_menu']") );
		if( inputFilter !=null && inputFilter.length > 0)
			inputFilter.focus();
	}
}

function showPopupMenuInternal(menu, caller)
{
	// On cache les tooltips
	try
	{
		htm();
	}
	catch(e){}

	if (caller != null && caller.length > 0)
	{
		// Reprendre le calcul de la position
		var parentObject = caller;
		
		// Infos du parent
		var parentLeft = parentObject.offset().left;
		var parentTop = parentObject.offset().top;
		var parentHeight = parentObject.height();
		var parentWidth = parentObject.width();
		
		// Infos de la fenetre
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var windowScrollTop = $(window).scrollTop();
		var windowScrollLeft = $(window).scrollLeft();		
		
		// Infos du menu qui va �tre affich�
		var widthMenu = menu.width();
		var heightMenu = menu.height();
		
		// Valeurs par d�faut si on arrive � se placer nul part
		var newLeft = parentLeft;
		var newTop = parentTop + parentHeight;
		
		// Cas du menu affich� � droite
		if((parentLeft + widthMenu) < (windowWidth + windowScrollLeft)) {
			newLeft = parentLeft;
		}
		// Cas ou le menu est affich� � gauche 
		else if((parentLeft - windowScrollLeft + parentWidth ) >= widthMenu ) {
			newLeft = parentLeft + parentWidth - widthMenu;
		}
		
		// Cas ou le menu est affich� en bas
		if((windowScrollTop + windowHeight) > (parentTop + parentHeight + heightMenu)) {
			newTop = parentTop + parentHeight;
		}
		// Cas ou le menu est affich� en haut
		else if ((parentTop - windowScrollTop ) >= heightMenu ) {
			newTop = parentTop - heightMenu;
		}
		
		menu.css("top", newTop + "px");
		menu.css("left", newLeft + "px");
	}
	menu.show();
	
	$(document).unbind("click.popup").bind("click.popup", function(event) {
		hidePopupMenu();
	});
	//document.onclick = hidePopupMenu; // a reprendre
	// TODO ? peut-�tre g�rer les sous-menus
}

function hidePopupMenu()
{
	var selectorPopupMenu = $('#popup-menu');
	if(selectorPopupMenu.length > 0)
	{
		if (vdpPopupMenuScreenState != null) // Il faut masquer le popup menu screen et restaurer le formulaire � son emplacement d'origine
		{
			var $hidden = $("#" + vdpPopupMenuScreenState);
			var id = $hidden.val();
			if (id != 'closed' )
			{
				var popupMenuScreen = $('#' + id);
				popupMenuScreen.html(selectorPopupMenu.find("form").html());
				$hidden.val( 'closed' );
			}
			vdpPopupMenuScreenState = null;
			selectorPopupMenu.unbind( "click.stopPopupPart" ).removeAttr( "rel" );
		}
		
		selectorPopupMenu.hide().removeClass().empty().css({ top : "0px", left : "0px"});
	}
}

function cleanPopupScreen( src )
{
	var selectorPopupMenu = $('#popup-menu');
	if(selectorPopupMenu.length > 0 && selectorPopupMenu.attr("rel") == src )
	{
		selectorPopupMenu.hide().removeClass().empty().css({ top : "0px", left : "0px"});
		vdpPopupMenuScreenState = null;
	}
}
//*****************************************************************************
//
// End - popupmenu
//
//*****************************************************************************

//*****************************************************************************
//
// Start - AutoComplete
//
//*****************************************************************************



//*****************************************************************************
//
// End - AutoComplete
//
//*****************************************************************************

/**
 * Laisse passer uniquement les chiffres de 0 � 1 et les touches syst�mes
 * On ne peut rien saisir d'autre dans l'input quand cette m�thode est d�finie sur le onkeydown 
 */
function vdocNumberKeyPress( event )
{
	var keyCode = null; // the Unicode value
	if( $.browser.mozilla )
	{
		keyCode = event.charCode;
		if( event.ctrlKey || keyCode === 0 )
			return true;
	}
	else keyCode = event.keyCode;
  var strChar = String.fromCharCode( keyCode ); // Convert the value into a character
  if( strChar && ( strChar === '-' || strChar.match( /^\d$/ ) ) )
  	return true;

	vdpPreventDefault(event);
  return false;
}

function vdocNumberKeyUp( self, event )
{
	if( self.checkValidity && !self.checkValidity() )
		self.value = "";
}