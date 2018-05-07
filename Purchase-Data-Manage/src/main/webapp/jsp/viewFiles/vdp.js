if (callBeforePostList==null)
{
	var callBeforePostList = new Array();
	var staticStrings = new Array();
	var vdpDoOnKey = null;
	var defaultFormName = null, defaultWidgetId = null, defaultWidgetParam = null, contextPath = null, actionUrl = window.location.href, topNavigatorId = null, currentHashLocation = '',lightBoxResizable = false , lightBoxVisible = false, lightBoxWidth=null, lightBoxHeight=null, vdpLoading=true;
	
	var forceMultipart = false;
	var datepickersObject = new VdpDatepickers(); // Objet qui g�re les datepickers
	// ContainerType utilis� pour redimensionner l'iframe du quickedit d'easysite
	var containerType = 0;
	// Param�tres pour g�rer les timers ajax 
	var vdpTimerAjax = new Array();
	// END BUILD PARAM
	var CSSsObject = new VdpCSSs() // Objet qui g�re les css
	
	var vdpLightBoxPreviousScrollTop, vdpLightBoxPreviousScrollLeft, vdpIsFakeLightboxContext = false, vdpFakeLightboxHeight = null, vdpFakeLightboxWidth = null, vdpFakeLightboxPortletId = null, vdpFakeLightboxPortletOverflow = null, vdpSimpleSource = new Array(), vdpMultipleSource = new Array(), vdpSelectorCheckbox = new Array(), vdpSelectorOnClickEventParam = "", vdpSelectorIdHiddenInput = "", vdpMultipleSelectorDegradedItems = false, timedCallCommonsSelectorOpen = null, lastSearchValueKeyPress = "", vdpAdvancedSelectorSearchInProgress = false, vdpReCallSearchAdvancedSelector = false, timedCallCommonsSimpleSelectorClose = null, timedCallCommonsMultipleSelectorClose = null, vdpCollapseExpandSections = new Array(), vdpCollapseExpandIdNavigatorIdMainSection = new Array(), vdpMessagesErrors = new Array(), vdpMessagesInfos = new Array(), prefixIdChampError = "vdpError_", prefixIdChampInfo = "vdpInfo_", vdpMessageErrorInfoBindScroll = new Array(), vpdArrayUIDatePickerDayNames = new Array(), vdpSelectCommonCurrentComboId = null, vdpSelectCommonBindScroll = new Array(), vdpSelectCommonThrowEventsContext = false, vdpCommonsAutocompleteIsOpen = false,vdpCommonsCKEditorIsModeSource = false, vdpSelectSimpleDivItems = null, vdpSelectMultipleDivItems = null, vdpCommonGlobalDivItem = null, vdpCommonGlobalDivItemBaseCssClass = null;
	var zindexVDPComboLigthbox = 9050, zindexVDPCombo = 5000;

	$(window).unbind('resize.vdpjs').bind('resize.vdpjs',function () {
		hidePopupMenu();
		vdpScrollResizeWindowMessages();
		vdpCommonSelectCloseAllCombo();
	});

	$(window).unbind('scroll.vdpjs').bind( 'scroll.vdpjs', function () {
		hidePopupMenu();
		vdpScrollResizeWindowMessages();
	});
	
	var CKEDITOR_BASEPATH = getBaseURI() + "/external-tools/ckeditor/";
	var lockVdpFireMessage = { lock : false };
}

function callBeforePost( formName, code )
{
	var formList = callBeforePostList[formName];
	if( formList==null )
	{
		formList = new Array();
		callBeforePostList[formName] = formList;
	}
	formList[formList.length] = code;
}

function vdpAjaxError( data )
{
    $error = $(data).find( "error" );
    if( $error.length > 0 )
    {
        alert( $error.text() );
        return true;
    }
    return false;
}

/**
 * 
 */
function vdpFormIsInterceptFireMessage( formId )
{
	var $form = $("#" + formId);
	if( $form.length > 0 )
	{
		
		var interceptFormLevel = $form.data("interceptFormLevel");
		if( interceptFormLevel != undefined )
		{
			interceptFormLevel = parseInt( $form.data("interceptFormLevel") );
			if( interceptFormLevel ==  2 ) // on doit en laisser passer un
			{
				$form.data("interceptFormLevel", 1);
				return false;
			}
			else if( interceptFormLevel ==  1 ) // on doit intercepter c'est le premier appel qui a empil� le deuxi�me
			{
				$form.data("interceptFormLevel", -1);
				return true;
			}
			else  $form.data("interceptFormLevel", -1); // on remet � -1 ce cas ne doit pas arriver
		}
	}
	return false;
}

/**
 * Permet d'intercepter un vdpFireMessage() appel� par un autre vdpFireMessage() pour le formulaire donn�
 * 
 * @param formId
 * @param intercept
 */
function vdpFormInterceptFireMessage( formId, intercept )
{
	var $form = $("#" + formId);
	if( $form.length > 0 )
	{
		if( intercept )
			$form.data("interceptFormLevel", 2);
		else $form.data("interceptFormLevel", -1);
	}
}

/**
 * Fire all form events
 * Useful when there is only one form and we don't know the name ...
 * @return
 */
function fireAllBeforePost()
{
	for (var formName in callBeforePostList)
	{
		if (document.forms[formName] != null)
			fireBeforePost( formName );
	}
}

function vdpCleanNavigatorJS( NID )
{
	vdpClearMessages( NID );
	datepickersObject.deregister( NID );
	vdpCommonClearCombos(NID);
	vdpCollapseExpandClear( NID );
}

function fireBeforePost( formName )
{
	var formList = callBeforePostList[formName];
	
	var str = formName.substring(4);
	var separator = str.lastIndexOf('_');
	if (separator != -1) {
		var NID = str.substring(0, separator);
		vdpCleanNavigatorJS( NID );
	}
	unRegisterDoOnDocumentChanged( formName );
	
	if( formList!=null )
	{
		var estack = new Array();
		for(var i=0; i<formList.length; i++)
		{
			try
			{
				eval( formList[i] );
			}
			catch(e)
			{
				//alert("Function call error:\n" + e.message + "\nCode:\n" + formList[i]);
				var thrower = formList[i];
				if(thrower.length > 40)
					thrower = thrower.substr(0,40) + '[...]';
				estack[estack.length] = "An exception occurred in the script: " + thrower + ". " + e.name 
				  + ": " + e.message; 
			}
		}
		if(estack.length > 0)
		{
			if(navigator.userAgent.indexOf("MSIE") > 0) {
				try { window.status = estack[0]; } catch(e) {}
			}
			throw estack[0];
		}
		
		delete callBeforePostList[formName];
	}
}

function doFocus()
{
 try
  {
    if(typeof(zone1)=="undefined" || zone1==null)
      return;
    if(zone1.length!=null) 
      zone1[0].focus();
    else 
      zone1.focus(); 
  }
  catch(e){}
}

/**
 * Retourne la taille du tableau pass� en param�tre
 * 
 * @param arr
 * @returns
 */
function vdocCommonsArraySize(arr)
{
	if(arr == null || arr == undefined )
		return 0;
	if(arr.length != undefined || arr.length != null  )
		return arr.length;
	var size = 0;
	for(key in arr)
		size++;
	return size;
}

/**
 * Initialize vdoc context
 */
function initializeVdoc(navId, ctxPath, url, vdpContainerType, sessionExpirationTime, sessionAliveUrl)
{
	topNavigatorId = navId;
	contextPath = ctxPath;
	actionUrl = url;
	bindDocumentOnKey();
	containerType = vdpContainerType;
	vdpAjaxTimerRegister( "loadingTimer", sessionExpirationTime, sessionAliveUrl );
	
	if ( containerType != 4 && containerType != 2 ) // On ne s'enregistre pas pour le mode iframe (sinon ie scroll sur chaque iframe) et dans EZS sinon quand on pose des ancres dans les pages on essaie de charger des �crans vdoc en faisant un $post
	{
		$(window).hashchange( function(){
			var hash = location.hash;
			if (hash != null && hash != '' && hash != currentHashLocation && topNavigatorId != null && unescape(hash) != unescape(currentHashLocation)) // Sous ff, le hash est deja unescaped
			{ // Redirect
				currentHashLocation = hash;
				$.post(actionUrl, { "NID": topNavigatorId, "USEAJAX": "true", "NMODE": "EVENT", "WID": topNavigatorId, "WVALUE": "history", "HASH": hash},ajaxApply,"xml");
			}
		});
	}
}

/**
 * Permet de g�rer une reconnexion
 */
function sessionLostAjax( ctxPath, vdpContainerType, redirectUrl )
{
	if (containerType == 4)
	{ // Iframe : on reload le parent
		window.parent.window.location.reload();		
	}
	else if (window.location.pathname.indexOf( ctxPath + "/easysite") == 0 || window.location.pathname.indexOf( ctxPath + "/mobile") == 0) // On est dans easysite ou en mobile => L'authentification est g�r�e sur la page courante
	{
		window.location.reload();
	}
	else window.location.href=redirectUrl;
}

/**
 * Enregistre un timer ajax
 * 
 * @param timerName le nom du timer qui permettra de l'utiliser
 * @param timerTime le temps avec l'execution du timer
 * @param timerUrl l'url pass�e par le call ajax
 */
function vdpAjaxTimerRegister(timerName, timerTime, timerUrl) {
	vdpAjaxTimerUnregister( timerName );
	vdpTimerAjax[timerName] = new Array();
	vdpTimerAjax[timerName]["time"] = timerTime;
	vdpTimerAjax[timerName]["url"] = timerUrl;
	vdpTimerAjax[timerName]["timeout"] = null;
}

/**
 * Lance le timer, le timer se rappelera tout seul automatiquement selon le param�tre time d�finit lors de la d�claration
 * 
 * @param timerName le nom du timer concern�
 */
function vdpAjaxTimerSetTimeout(timerName) {
	if(vdpTimerAjax[timerName] != null && vdpTimerAjax[timerName] != undefined
			&& vdpTimerAjax[timerName]["time"] != null && vdpTimerAjax[timerName]["url"] != null) {
		
		vdpAjaxTimerClearTimeout( timerName );
		vdpTimerAjax[timerName]["timeout"] = setTimeout(function() { vdpAjaxTimerCallAjax( timerName ) } , vdpTimerAjax[timerName]["time"]);
	}
}

/**
 * Appel ajax du timer
 * 
 * @param timerName le nom du timer concern�
 */
function vdpAjaxTimerCallAjax(timerName) {
	$.ajax({
		type: "GET",
		cache: false,
	  url: vdpTimerAjax[timerName]["url"]
	}).done(function ( data ) {
		vdpAjaxTimerSetTimeout( timerName );
	});
}

/**
 * Clear le timeout du timer
 * 
 * @param timerName le nom du timer concern�
 */
function vdpAjaxTimerClearTimeout(timerName) {
	if(vdpTimerAjax[timerName] != null && vdpTimerAjax[timerName] != undefined && vdpTimerAjax[timerName]["timeout"] != undefined && vdpTimerAjax[timerName]["timeout"] != null) {
		clearTimeout(vdpTimerAjax[timerName]["timeout"]);
	}
}

/**
 * Supprime le timer
 * 
 * @param timerName le nom du timer concern�
 */
function vdpAjaxTimerUnregister(timerName) {
	if(vdpTimerAjax[timerName] != null && vdpTimerAjax[timerName] != undefined) {
		vdpAjaxTimerClearTimeout( timerName );
		delete vdpTimerAjax[timerName];	
	}
}

/**
 * Permet de redimensionner l'iframe lorsque l'on est dans un context quickedit d'easysite
 */
function vdpResizeIFrame() {
	// containerType �gual � 5 correspond au container quickEdit en IFrame d'easysite
	if( containerType == 5 ) {
		parent.resizeLocalIFrame(parent.document.getElementById('def_panel_iframe'), 'def_panel_content');
	}
}

function lockVdpFireMessage()
{
	if( lockVdpFireMessage["lock"] )
		return;
	lockVdpFireMessage["lock"] = true;
}

function unlockVdpFireMessage()
{
	lockVdpFireMessage["lock"] = false;
	if( lockVdpFireMessage["params"] != null )
	{
		vdpFireMessage( lockVdpFireMessage.params.formName, lockVdpFireMessage.params.widgetId, lockVdpFireMessage.params.widgetParam, lockVdpFireMessage.params.showModalLoading, lockVdpFireMessage.params.noPost, false );
		lockVdpFireMessage["params"] = null;
	}
}

/**
 * 
 * @param forceUnlock
 */
function vdpFireMessageHandleLock( forceUnlock,formName, widgetId,widgetParam,noPost,showModalLoading )
{
	if( !forceUnlock )
	{
		if( lockVdpFireMessage["lock"] )
		{
//			if( lockVdpFireMessage["params"] == null)
//			{
//				lockVdpFireMessage["params"] = { "formName" : formName, "widgetId" : widgetId, "widgetParam" : widgetParam, "showModalLoading" : showModalLoading, "noPost" : noPost };
//				if( showModalLoading == null || showModalLoading == undefined || showModalLoading )
//					showPostAction( false );
//			}
			return true;
		}
	}
	
	return false;
}

function vdpFireMessage( formName, widgetId, widgetParam, showModalLoading, noPost, forceUnlock )
{
	if( vdpFireMessageHandleLock( forceUnlock,formName, widgetId,widgetParam,noPost,showModalLoading ) )
	{
		alert(getStaticString('LG_FILES_UPLOADING_IN_PROGRESS'));
		return;
	}		
	
	// Si le vdpLoading est � true c'est que le chargement est encore en cours il ne faut pas envoyer de vdpFireMessage()
	if(vdpLoading) {
		return;
	}
	
	if (!noPost)
	{
		vdpHideMessages();
		vdpCommonSelectCloseCombosFireMessage();
		vdpTooltipClear();
		
		if( vdpFormIsInterceptFireMessage( formName ) )
			return;
		
		fireBeforePost( formName );
	}

	if( showModalLoading == null || showModalLoading == undefined || showModalLoading )
		showPostAction( false );
	
	var str = formName.substring(4);
	var separator = str.lastIndexOf('_');
	if (separator == -1) alert("Invalid form name");
	var NID = str.substring(0, separator);
	var TID = str.substring(separator + 1);

	var form = document.forms[formName];
	if (form == null || noPost)
	{ // Pas de formulaire : on fait un appel simple
		calls = new Array(); // prepare doOnLoad
		// important: USEAJAX param MUST be sent before TID param to prevent a server side handler to remove it 
		// when an unattended request is sent. for example an image with an empty 'src' attribute will use the 
		// navigator current location as source and accidently increment the TID.
		$.post(actionUrl, { "NID": NID, "USEAJAX": "true", "TID": TID, "WID": widgetId, "WVALUE": widgetParam, "NMODE": "EVENT"},ajaxApply,"xml");		
	}
	else
	{
		form.WID.value = widgetId;
		form.WVALUE.value = widgetParam;
		
		form.USEAJAX.value = "true";		
		calls = new Array(); // prepare doOnLoad
		
		var multipart = ( forceMultipart || formContainsFile( formName ) );
		if( multipart )
		{					
			AjaxUploadMultipart(form,ajaxApply);							
		}
		else
		{ // Ajax
			try
			{
				// On v�rifie si on a un formulaire de popupmenu (popupmenu part)
				var formData = popupMenuPartFireMessage( formName, $("#" + formName).serialize() );
				$.post(form.action, formData, ajaxApply, "xml");
			}
			catch(e)
			{
				form.submit();
			}
		}
	}
}

function ajaxApply(data)
{
	
	var ajaxNode = data.documentElement;
    if( ajaxNode.nodeName != "ajax-response" )
	{
	   vdpShowError("Ajax Error: Unknown documentElement "+ajaxNode.nodeName);
	  return;
	}
	var errors = null;
	var child = ajaxNode.firstChild;
	var ret = true;
	while( child!=null )
	{
	    try
	    {
	      if( child.nodeType==1)
	      {
	        if( child.nodeName == "ajax-html" )
	        {
	          if (!ajaxApplyHtml( child ))
	          	ret = false;
	        }
	        else if ( child.nodeName == "ajax-script" )
        	{
        		eval( ajaxGetText(child) );
        	}
	        else
	          throw "Unknown ajax command: "+child.nodeName;
	      }
	    }
	    catch(e)
	    {
	      if( errors==null )
	        errors = "Exception: "+errorMsg(e);
	      else
	        errors += "\nException: "+errorMsg(e);
	    }
	    child=child.nextSibling;
	}
	if( errors!=null )
	  vdpShowError(errors);
	
	if (ret)
		setTimeout("vdpDoOnLoad()",0);
}

function errorMsg( e )
{
  var msg = "";
  if(e!=null)
  {
    try { msg = e.description; } catch(e) {}
    if( msg==null || msg=="" )
      try { msg = e.toString(); } catch(e) {}
    if( msg==null )
      msg = "";
  }
  return msg;
}

function ajaxGetText( node )
{
	var nodeText;
	try
	{
		nodeText = node.text; // IE
	}
	catch(e) {}
	if (typeof(nodeText)=="undefined")
		nodeText = node.textContent; // Other browsers
	return nodeText;
}

function ajaxApplyHtml( node )
{
    var id = node.getAttribute("id");
    var part = $("#"+id);
    if (id == null || id == '')
    	part = $('body');
    
    var beforeLoad = node.getAttribute("beforeLoad");
    if (beforeLoad && beforeLoad != null)
    {
    	var stopRender = false;
    	eval(beforeLoad);
    	if (stopRender)
    		return false; // On ne met pas � jour la fen�tre (ex redirection)
    }
    
    var cssClass = node.getAttribute("cssClass");
    if (cssClass && cssClass != null)
    	part.removeClass().addClass("screen " + cssClass);
    
    part.html(''); // IE trick to free up DOM objects and avoid memory leaks
    part.html(ajaxGetText(node));
    return true;
}


function vdpModifyDefaultWID( formName, buttonName, event )
{
	try
	{
	  var keyCode = event.keyCode || event.which || 0;
		if( keyCode == 13 )
		{
		  if( formName!=null )
		  {
			  var form = document.forms[formName];
			  if( form!=null )
			  {			  
					var defaultWid = form["DEFAULTWID"];
					if( defaultWid!=null )
					{
						defaultWid.value = buttonName;
						var defaultWvalue = form["DEFAULTWVALUE"];
						if( defaultWvalue!=null )
						  defaultWvalue.value = 1;		
					}
				}
		  }		  
		}
	}
	catch(e)
	{}
}

function vdpIsset( variable )
{
	return variable != null && variable != undefined;
}


var doOnDocumentChanged = new Array();

function registerDoOnDocumentChanged(formName, script)
{
	var modifiedInput = $('#' + formName).find('input[name$="MODIFIED"]');
	if(modifiedInput.length > 0 && modifiedInput.val() == "true")
	{
		eval(script);
	}
	else {
		doOnDocumentChanged[formName] = script;
	}
}

function unRegisterDoOnDocumentChanged(formName)
{
	if(doOnDocumentChanged != null &&  doOnDocumentChanged[formName] != null)
		delete(doOnDocumentChanged[formName]);
}

function vdpDocumentChanged(formName)
{
	var modifiedInput = $('#' + formName).find('input[name$="MODIFIED"]');
	if(modifiedInput.length > 0 && modifiedInput.val() == "true") {
		return;
	}
	else {
		modifiedInput.val('true');
		if (doOnDocumentChanged != null && doOnDocumentChanged[formName] != null)
		{
			eval(doOnDocumentChanged[formName]);
		}
	}
}

function bindDocumentOnKey()
{
	if (vdpDoOnKey != null)
		return;
	
	$(document).unbind("keydown").bind("keydown", function (event) {
		vdpDocumentOnKey( event );
	});
	
	vdpDoOnKey = new Array();
}

function registerOnKey(method)
{
	unregisterOnKey(method);
	vdpDoOnKey.push(method);
}

function unregisterOnKey(method)
{
	var i = null;
	var newArray = new Array();
	for(index in vdpDoOnKey) {
		if(vdpDoOnKey[index] != method) {
			newArray.push(vdpDoOnKey[index]);
		}
	}
	delete(vdpDoOnKey);
	vdpDoOnKey = newArray;
}

function vdpDocumentOnKey(event)
{
	if ( vdpDoOnKey.length > 0 ) {
		// On traite l'�v�nement au niveau document
		var method = vdpDoOnKey[vdpDoOnKey.length - 1];
		method(event);
	}
}

function vdpDoOnLoad()
{
	if (!CSSsObject.isready()){
		setTimeout("vdpDoOnLoad()",10);
		return;		
		}
	CSSsObject.clear();
	
	if( calls!=null && calls.length!=null )
	{
		var i;
		var estack = new Array();
		for (i=0;i<calls.length;i++)
		{
			try
			{
				eval(calls[i]);
			}
			catch(e) 
			{ 
				var thrower = calls[i];
				console.log("error occured, thrower : " + thrower + " - name : " + e.name + " - message : " + e.message);
				if(thrower.length > 40)
					thrower = thrower.substr(0,40) + '[...]';
				estack[estack.length] = "An exception occurred in the script: " + thrower + ". " + e.name 
				  + ": " + e.message; 
			}
		}
		if(estack.length > 0) {
			
			var errorMessage = "";
			for(i=0; i<estack.length; i++) {
				errorMessage+=estack[i]+"\n";
				alert(errorMessage);
			}
			throw(errorMessage);
		}
	}
	
	calls = new Array();
	showPostAction( true );
}

function vdpShowError( msg )
{
  showPostAction( true );
  alert("Error:\n"+msg);
  canUseAjaxRequest = new Function("","return false;");
}

function vdpToggleViewItemDetails(event, itemId)
{
	// toggle details
	var details = $('#'+itemId);
	$(details).toggleClass('details-visible');
	stopPropagation(event);
}

function formContainsFile( formName )
{
  var form = document.forms[formName];
  if( form!=null )
  {
		for( var i=0; i<form.elements.length; i++)
		{
			var elem = form.elements[i];
		  try
		  {
			  if( elem.name!=null && elem.name.length>0 && elem.tagName.toUpperCase()=="INPUT" )
			  {
			  	if( elem.type.toLowerCase()=="file" && elem.value!=null && elem.value.length>0 )
			  	  return true;
	      }
		  }
		  catch( ignore )
		  {}
		}
	}
	return false;
}

function beforeSelector( messageFormName, adminFormName, id , sendselecteditems ) 
{
	var messageForm = document.forms[messageFormName];
	var adminForm   = document.forms[adminFormName];
  adminForm.WID.value = id ;
  if ( sendselecteditems )
  {
	  if ( messageForm.elements[id + '_selected_keys'])
	  {
		  adminForm.selectedkeys.value=getStringValues( messageForm, id + '_selected_keys' );
		  adminForm.selectedvalues.value=getStringValues( messageForm, id + '_selected_values' );
		  adminForm.selectedclasses.value=getStringValues( messageForm, id + '_selected_classes' );
		  adminForm.selectedlabels.value=getStringValues( messageForm, id + '_selected_labels' );
		  adminForm.addedparams.value=getStringValues( messageForm, id + '_added_params' );	  	  	  	  	  	  	  	  				  	  	  	  
	  }	
  }
}

function getStringValues( messageForm, eltName )
{
	var arr = new Array();
	var elements = messageForm.elements[eltName];
	if ( elements !=null)
	{
		var size =  elements.length;
		if ( size != null && size > 0)
		{
			for ( i=0;i<size;i++)
			{
				arr[i] = elements.item(i).value;
			}
		}
		// Only one value
		else arr[0] = elements.value;
	}
	return arr.join(';');
}

function refresh( messageFormName )
{
	// this function is exclusively called by the selectors (directory and others...)
	vdpFireMessage(messageFormName,document.forms[messageFormName].WID,'') ;
}

function vdpShowHide( obj, show  )
{
	if ( typeof(obj)=="string" )
	{
		obj = document.getElementById(obj);
	}

  if ( obj!=null )
  {
  	try
		{
  		if ( show==true || ( show==null  && obj.style.display=="none" ) )
			{
				obj.style.display = "inline";
			}
			else if ( show==false || ( show==null  && obj.style.display!="none" ) )
			{
				obj.style.display = "none";
			}
  	}
  	catch( e )
  	{}
  }
}

function getBaseURI() {
	var uri = window.location.href;
	var i = uri.indexOf('//');
	if(i==-1) {
		return '/vdoc'; // should *never* occurs
	}
	var j = uri.indexOf('/', i+2);
	uri = uri.substring(j);
	var j = uri.indexOf('/', 1);
	if(j==-1) {
		return uri;
	}
	return uri.substring(0, j);
}

/* Ui loader */
function loader(loading) {	
	var element = $('#ui-loader-background');
	try {
		if(loading) {
			if(element.length==0) 
			{					
			  var baseURI = getBaseURI();
				var element =$(document.createElement('DIV')).attr('id', 'ui-loader-background').addClass('ui-loader-background').html('<img src="'+baseURI +'/images/transp.gif" width="100%" height="100%"/>' ).appendTo('body').hide();			
				var loaderElement= $(document.createElement('DIV')).addClass('ui-loader').appendTo(element);					
				var loadingElement= $(document.createElement('DIV')).addClass('ui-loading').html('<span>'+getStaticString('LG_LOADING')+'</span>').appendTo(loaderElement);
	        
				if (!lightBoxResizable)
				{
					$(window).bind('resize', function () { loaderResize(); });
					lightBoxResizable=true;
				}	
	    }			   	
			loaderResize();
			element.show();
			vdpAjaxTimerSetTimeout( "loadingTimer" );
		}
    else {
    	if(element) {
    		element.hide();
    	}
    	vdpAjaxTimerClearTimeout( "loadingTimer" );
   	}
	} 
	catch(e) {
		if(element) {
			element.hide();
		}
		vdpAjaxTimerClearTimeout( "loadingTimer" );
	}
}

function loaderResize() {
	
	if (!vdpLoading) return;
	var xhtmlMode=true;
	var screenWidget=$(window);		
	var backgroundWidth=screenWidget.width();
	var backgroundHeight=screenWidget.height();	
	var scrolltop=0;
	var scrollleft=0;
	
	var positionType=	'fixed';
	
	if($.browser.msie)
	{
		if( $('.lightbox-background').length!=1 )
		{
			xhtmlMode=false;
			var documentWidget=$(document);
			positionType='absolute';
			backgroundWidth=documentWidget.width()-5;
			backgroundHeight=documentWidget.height()-5;			
		}
	}

	var loaderWidget=$('#ui-loader-background');
	
	loaderWidget.css({
		'position': positionType,
		'z-index': '9999',
		top:0,
		left:0,
		width:backgroundWidth,
		height:backgroundHeight});
		
	var contentLayer=loaderWidget.find('.ui-loader');
	
	if(!xhtmlMode)
		{
		scrolltop=documentWidget.scrollTop(); 
		scrollleft=documentWidget.scrollLeft(); 
		}
	contentLayer.css({
		position:positionType,		
		left: ((screenWidget.width() - contentLayer.outerWidth())/2) + scrollleft,
		top: ((screenWidget.height() - contentLayer.outerHeight())/2) + scrolltop
	});	
}

function showPostAction( show )
{
	vdpLoading = !show;
  try
  {
  	setTimeout('loader(vdpLoading)', 250);
  }
  catch(e) {}
  return null;
}

function getStyleFromRules( selector )
{
  try
  {
    selector = selector.toLowerCase();
    var sheets = null;
    if( typeof(document.styleSheets)!="undefined" && typeof(document.styleSheets.length)!="undefined" )
      sheets = document.styleSheets;
    else if( typeof(document.styleSheet)!="undefined" && typeof(document.styleSheet.length)!="undefined" )
      sheets = document.styleSheet;
    if( sheets != null )
    {
      for(var i1=0; i1<sheets.length; i1++)
      {
        var sheet = sheets[i1];
        var rules = null;
        if( typeof(sheet.rules)!="undefined" && typeof(sheet.rules.length)!="undefined" )
          rules = sheet.rules;
        else if( typeof(sheet.cssRules)!="undefined" && typeof(sheet.cssRules.length)!="undefined" )
          rules = sheet.cssRules;

        if( rules !=null )
        {
          for(var i2=0; i2<rules.length; i2++)
          {
            if( typeof(rules[i2].selectorText)!="undefined" &&
                selector == rules[i2].selectorText.toLowerCase()  )
            {
              return rules[i2].style;
            }
          }
        }
      }
    }
  }
  catch(e) {}
  return null;
}

function displayVML( diagramId, vmlGroupId )
{
  try
  {
    var vmlGroup = document.getElementById( vmlGroupId );
    if( vmlGroup==null || vmlGroup.rotation!=0 )
    {
      var htmlTag = document.body;
      while( htmlTag!=null && htmlTag.tagName.toUpperCase()!="HTML" )
        htmlTag = htmlTag.parentElement;
        
      if( htmlTag!=null )
      {
        htmlTag.setAttribute("xmlns:v","urn:schemas-microsoft-com:vml");
        htmlTag.setAttribute("xmlns:v","urn:schemas-microsoft-com:vml");
      }
      
      var diagram = document.getElementById( diagramId );
      if( diagram!=null )
        diagram.innerHTML = diagram.innerHTML;
    }
  }
  catch(e)
  {
  	return false;
  }
  return true;
}

function setHashLocation( hash )
{
	var oldHash = window.location.hash;
		
	if (oldHash != null && oldHash != '' && currentHashLocation == '' && oldHash != hash) // Cas du copier/coller d'URL
	{ // On ne met pas a jour le hash, met on declenche l'evenement
		// On teste d'abord si le hash est diff�rent du queryString (permet de g�rer le cas du copier/coller d'une URL simple) (petite optimisation BUG-006624)

		if (isHashDifferentFromQueryString())
		{
			$(window).hashchange();
		}
		else
		{
		currentHashLocation = hash; // On met � jour la hash mais on ne recharge pas
		}
		return;
	}

	currentHashLocation = hash;
	window.location.hash = hash;
}

function isHashDifferentFromQueryString()
{
	var url = location.href;
	// Remove hash
	var hashSeparator = url.indexOf("#");
	if (hashSeparator > -1)
		url = url.substring(0, hashSeparator);	
	
	var queryStringIndex = url.indexOf("?");
	if (queryStringIndex == -1)
		return true;
	url = url.substring(queryStringIndex + 1);	
	
	var hash = window.location.hash;
	if (hash.substring(0,7) != "#screen") // Le hash doit commencer par screen
		return true;
	var separator = hash.indexOf("&");
	if (separator == -1)
		return true;
	hash = hash.substring(separator + 1);
	
	// On splitte et on compare
	var hashSplit = hash.split("&");
	var urlSplit = url.split("&");
	
	if (hashSplit.length != urlSplit.length)
		return true;
	
	for(var i=0 ; i<hashSplit.length ; i++)
		{
			var found = false;
			for(var j=0 ; j<urlSplit.length ; j++)
			{
				if ( hashSplit[i] == urlSplit[j] )
					{
						found = true;
						break;
					}
			}		
			if (!found)
				return true;
		}
	return false;
}

function vdpUnload()
{ 
	var date = new Date();
	date.setTime( date.getTime() + 1000); // Expires in 1s
	// Split location (keeps only the end)
	var url = location.href;
	url = url.substring(url.indexOf("://") + 3); // Remove prefix (http://)
	url = url.substring(url.indexOf("/")); // Remove host:port
	// Remove hash
	var hashSeparator = url.indexOf("#");
	if (hashSeparator > -1)
		url = url.substring(0, hashSeparator);
	
	document.cookie = 'VDocReload=' + escape(url) + '|' + topNavigatorId + ';expires=' + date.toGMTString();
}

//************************************************************************
// fonctions javascript utilis�es par le treeview de d�l�gation
//
// auteur : fsalque
//------------------------------------------------------------------------
// delegableClicked
// fonction appel�e au clic sur une checkbox de selection d'�l�ment
// d�l�gable.
// Si la checkbox est coch�e --> cochage de tous les fils => Et du parent si tout est coch�
// Si la checkbox est d�coch�e --> d�cochage de tous les parents
// Param�tres:
//	checkBox : la checkbox cliqu�e par l'utilisateur
// 
// Valeur retourn�e: aucune
//------------------------------------------------------------------------
function delegableClicked(checkBox)
{
	if(checkBox.checked)
	{
		checkDlgChildren(checkBox,true);
		checkDlgParentIfAllChecked(checkBox);
	}
	else
	{
		checkDlgChildren(checkBox,false);
		checkDlgParent(checkBox,false);
	}
}
//------------------------------------------------------------------------
// checkDlgChildren
// coche ou d�coche toutes les checkboxes filles de checkBox
//
// Param�tres:
//	checkBox : la checkbox
//  checked : bool�en true pour cocher, false pour d�cocher
// 
// Valeur retourn�e: aucune
//------------------------------------------------------------------------
function checkDlgChildren(checkBox,checked)
{
	var childrenCheckBox=checkDlgGetChildren(checkBox);
	if (childrenCheckBox != null)
	{
		var length=childrenCheckBox.length;
		for(var i=0;i<length;i++)
		{
			childrenCheckBox[i].checked=checked;
		}
	}
}
function checkDlgGetChildren(checkBox)
{
	var tableNode=checkBox.parentNode;
	for(var i=0;i<3 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.tagName=="TABLE")
	{
		return tableNode.getElementsByTagName("INPUT");
	}
	return null;
}
//------------------------------------------------------------------------
// checkDlgParent
// coche ou d�coche toutes les checkboxes parents de checkBox
//
// Param�tres:
//	checkBox : la checkbox
//  checked : bool�en true pour cocher, false pour d�cocher
// 
// Valeur retourn�e: aucune
//------------------------------------------------------------------------
function checkDlgParent(checkBox,checked)
{
	var parentCheckBox=checkDlgGetParentCheckbox(checkBox);
	if (parentCheckBox != null)
	{
		parentCheckBox.checked=checked;
		checkDlgParent(parentCheckBox,checked);
	}
}
function checkDlgParentIfAllChecked(checkBox)
{
	var parent = checkDlgGetParentCheckbox(checkBox);
	if (parent != null)
	{
		var allChildrenChecked = true;
		var children = checkDlgGetChildren(parent);
		var length=children.length;
		for(var i=0;i<length;i++)
		{
			if (children[i] != parent && !children[i].checked)
			{
					allChildrenChecked = false;
			}
		}
		if (allChildrenChecked)
		{
			parent.checked = true;
			checkDlgParentIfAllChecked(parent);
		}
	}
}
function checkDlgGetParentCheckbox(checkBox)
{
	var tableNode=checkBox.parentNode;
	for(var i=0;i<7 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.tagName=="TABLE")
	{
		var parentTr=tableNode.rows[0];
		var contentTd=parentTr.cells[1];
		return contentTd.getElementsByTagName("INPUT")[0];
	}
	return null;
}
//------------------------------------------------------------------------
// delegationExpandCollapse
// plie/d�plie un noeud de treeview, sp�cifique au fonctionnel d�l�gation
// --> quand on d�plie un noeud, si un de ses fils est s�l�ctionn�, ses fils sont
// d�pli�s jusqu'au premier fils selectionn�
//
// Param�tres:
//	node : le noeud de treeview � plier/d�plier
// 
// Valeur retourn�e: aucune
//------------------------------------------------------------------------
function delegationExpandCollapse(node)
{
	//mise � jour de l'icone du noeud
	if(node.className == 'treeNodeExpanded') 
	{
		node.className = 'treeNodeCollapsed';
	} 
	else 
	{
		node.className = 'treeNodeExpanded';
	}
	//expand/collapse
	var tableNode=node.parentNode;
	for(var i=0;i<2 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	
	if(tableNode!=null && tableNode.rows!=null)
	{
		if(tableNode.rows[1].style.display=="none")
		{
			//expand
			delegationExpandNode(tableNode.rows[0].cells[0])
		}
		else
		{
			//collapse
			tableNode.rows[1].style.display="none";
		}
	}	
}
//------------------------------------------------------------------------
// delegationExpandNode
// d�plie un noeud de treeview, sp�cifique au fonctionnel d�l�gation
// --> quand on d�plie un noeud, si un de ses fils est s�l�ctionn�, ses fils sont
// d�pli�s jusqu'au premier fils selectionn�
//
// Param�tres:
//	node : le noeud de treeview � d�plier
// 
// Valeur retourn�e: aucune
//------------------------------------------------------------------------
function delegationExpandNode(node)
{
	if(node.className != 'treeNodeExpanded' && node.className != 'treeNodeCollapsed')  
	{			
		return;
	}	
	//mise � jour de l'icone du noeud
	node.className = 'treeNodeExpanded';
	//expand
	var tableNode=node.parentNode;
	for(var i=0;i<2 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.rows!=null)
	{
		tableNode.rows[1].style.display="";
		
		var childContainer=tableNode.rows[1].cells[1];
		
		var childrenList=childContainer.childNodes;
	
		if(childrenList!=null)
		{
			var childrenLength=childrenList.length;
			for(var i=0;i<childrenLength;i++)
			{
				if(childrenList[i].tagName=="TABLE")
				{
					var nodeCheckBox=childrenList[i].rows[0].cells[1].firstChild;
					if(!nodeCheckBox.checked)
					{
						var childCheckBoxes=childrenList[i].getElementsByTagName("INPUT");
						var checkBoxesCount=childCheckBoxes.length;
						var expandChild=false;
						for(var j=0;j<checkBoxesCount && !expandChild;j++)
						{
							expandChild=(childCheckBoxes[j].checked);
						}
						if(expandChild)
						{
							delegationExpandNode(childrenList[i].rows[0].cells[0]);
						}
					}
				}
			}
		}
	}
}
// Fin des fonctions d�l�gations
//************************************************************************
// Fonctions javascript utilis�es par les treeview
//------------------------------------------------------------------------
// tvExpandCollapse
// plie/d�plie un noeud de treeview
//
// Param�tres:
//	node : le noeud de treeview � plier/d�plier
// 
// Valeur retourn�e: aucune
// auteur : fsalque
//------------------------------------------------------------------------
function tvExpandCollapse(node)
{
	//mise � jour de l'icone du noeud
	if(node.className == 'treeNodeExpanded') 
	{
		node.className = 'treeNodeCollapsed';
	} 
	else 
	{
		node.className = 'treeNodeExpanded';
	}
	//expand/collapse
	var tableNode=node.parentNode;
	for(var i=0;i<2 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.rows!=null)
	{
		if(tableNode.rows[1].style.display=="none")
		{
			tableNode.rows[1].style.display="";
		}
		else
		{
			tableNode.rows[1].style.display="none";
		}
	}
}
//------------------------------------------------------------------------
//tvExpandAllnode
//d�plie tous les noeuds de treeview
//
//Param�tres:
//	
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function tvExpandAllNode(treeViewId)
{	
	var treeView = document.getElementById(treeViewId);	
	
	if (treeView!=null)
	{
		var tableNode;
		// probl�me du moteur GECKO espace ins�cable dans FireFox
		if(treeView.firstChild!= null && treeView.firstChild.nodeType != 3)
		{
			tableNode = treeView.firstChild;
		}
		else
		{
			tableNode = treeView.firstChild;
			while (tableNode.nodeType == 3) {
				tableNode = tableNode.nextSibling;
			}
		}
		while(tableNode!=null)
		{
			if( tableNode.rows!=null)
			{			
				//expand
				tvExpandAllNodes(tableNode.rows[0].cells[0]);			
			}
			tableNode=tableNode.nextSibling;
		}
	}	
}
//------------------------------------------------------------------------
//tvExpandAllNodes
//d�plie tous les noeuds de treeview
//
//Param�tres:
//	node : le noeud de treeview � d�plier
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function tvExpandAllNodes(node)
{
	if(node.className != 'treeNodeExpanded' && node.className != 'treeNodeCollapsed')  
	{			
		return;
	}	
	//mise � jour de l'icone du noeud
	node.className = 'treeNodeExpanded';
	//expand
	var tableNode=node.parentNode;
	for(var i=0;i<2 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.rows!=null)
	{
		tableNode.rows[1].style.display="";
		
		var childContainer=tableNode.rows[1].cells[1];
		
		var childrenList=childContainer.childNodes;
	
		if(childrenList!=null)
		{
			var childrenLength=childrenList.length;
			for(var i=0;i<childrenLength;i++)
			{
				if(childrenList[i].tagName=="TABLE")
				{					
					tvExpandAllNodes(childrenList[i].rows[0].cells[0]);					
				}
			}
		}
	}
}
//------------------------------------------------------------------------
//tvExpandAllnode
//plie tous les noeuds de treeview
//
//Param�tres:
//	
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function tvCollapseAllNode(treeViewId)
{		
	var treeView = document.getElementById(treeViewId);
	if (treeView!=null)
	{
		var tableNode;
		// probl�me du moteur GECKO espace ins�cable dans FireFox
		if(treeView.firstChild!= null && treeView.firstChild.nodeType != 3)
		{
			tableNode = treeView.firstChild;
		}
		else
		{
			tableNode = treeView.firstChild;
			while (tableNode.nodeType == 3) {
				tableNode = tableNode.nextSibling;
			}
		}						
		while(tableNode!=null)
		{
			if( tableNode.rows!=null)
			{
				//collapse
				tvCollapseAllNodes(tableNode.rows[0].cells[0]);			
			}
			tableNode=tableNode.nextSibling;
		}
	}
}
//------------------------------------------------------------------------
//tvCollapseAllNodes
//plie tous les noeuds de treeview
//
//Param�tres:
//	node : le noeud de treeview � d�plier
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function tvCollapseAllNodes(node)
{
	if(node.className != 'treeNodeExpanded' && node.className != 'treeNodeCollapsed')  
	{			
		return;
	}	
	//mise � jour de l'icone du noeud
	node.className = 'treeNodeCollapsed';
	//collapse
	var tableNode=node.parentNode;
	for(var i=0;i<2 && tableNode!=null ;i++)
	{
		tableNode=tableNode.parentNode;
	}
	if(tableNode!=null && tableNode.rows!=null)
	{		
		tableNode.rows[1].style.display="none";
		
		var childContainer=tableNode.rows[1].cells[1];
		
		var childrenList=childContainer.childNodes;
	
		if(childrenList!=null)
		{
			var childrenLength=childrenList.length;
			for(var i=0;i<childrenLength;i++)
			{
				if(childrenList[i].tagName=="TABLE")
				{					
					tvCollapseAllNodes(childrenList[i].rows[0].cells[0]);					
				}
			}
		}
	}
}
//Fin des fonctions de treeview
// Same as portal one, without the parentID
function vdpExpandCollapse(caller,objID)
{
	var obj = document.getElementById(objID);
	if (obj)
	{
		(obj.style.display=="none") ? obj.style.display="" : obj.style.display="none";
	}
	if (!typeof caller=='object') caller = document.getElementById(caller);
	if(caller && (typeof caller=='object'))
	{						
		if(caller.className.indexOf("-collapsed") > 0)
			caller.className = caller.className.replace("-collapsed","-expanded");
		else if(caller.className.indexOf("-expanded") > 0)
			caller.className = caller.className.replace("-expanded","-collapsed");
	}
	return true;
}

//Resize iframe if possible (works on distant server, but a distant js must be called)
function resizeIframe(frameId, contentId)
{
	try
	{ 
	    var content = $("#"+contentId);
		content.css('height','1px').css('overflow','auto'); // On calcule la taille
		var size = document.getElementById(contentId).scrollHeight;
		content.css('height','');	// On remet en taille standard
			
		if(navigator.userAgent.indexOf("MSIE") > 0)
		{
			window.resizeTo(document.body.scrollWidth,size);
		}
		else
		{	// On poste au p�re
			parent.postMessage("frameId="+ frameId + "&frameHeight=" + size, "*");
		}
	}
	catch (e) { 
	}
}

// This function will close a popup and reload parent page
function closeAndRefresh()
{
	try
	{
		window.opener.parent.window.location.reload();
	}
	catch(e) {} // Probably no permission to reload parent (cross domain)
	window.close();
}

//------------------------------------------------------------------------
// switchClass
// modifie la classe pour un element donne
//
// Param�tres:
//	l'object dont la classe doit �tre modifi�
//	les deux classes � inverser
// 
// Valeur retourn�e: aucune
// auteur : omenuel
//------------------------------------------------------------------------
function switchClass( elem, class1, class2 )
{
	if (elem != null)
	{
	  if (elem.className == class1)
	  {
	    elem.className = class2;
	  }
	  else
	  {
	    elem.className = class1;
	  }
	}
}
//************************************************************************
//fonctions javascript utilis�es par les treeviews d'administration EasySite
//
//auteur : fsalque
//------------------------------------------------------------------------
//ezsAdminExpandCollapse
//plie/d�plie un noeud de treeview, sp�cifique au fonctionnel d�l�gation
//--> quand on d�plie un noeud, si un de ses fils est s�l�ctionn�, ses fils sont
//d�pli�s jusqu'au premier fils selectionn�
//
// Remarque : m�me fonctionnement que la d�l�gation : appel de delegationExpandCollapse 
//
//Param�tres:
//	node : le noeud de treeview � plier/d�plier
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function ezsAdminExpandCollapse(node)
{
	delegationExpandCollapse(node);
}
//ezsAdminTvClicked
//fonction appel�e au clic sur une checkbox de selection dans les
//treeview de l'administration EasySite
//Si la checkbox est coch�e --> cochage de tous les fils
//Si la checkbox est d�coch�e --> d�cochage de tous les parents
//
// Remarque : m�me fonctionnement que la d�l�gation : appel de delegableClicked 
//
//Param�tres:
//	checkBox : la checkbox cliqu�e par l'utilisateur
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function ezsAdminTvClicked(checkBox)
{
	delegableClicked(checkBox);
}

/**
 * Display action menu in ajax (html is generated by the server)
 * Used for easysite
 */
function loadMenu(requestUrl,menuContainerId,menuOpener)
{
	$.ajax({
	  url: requestUrl,
	  context: document.body,
	  dataType: 'html',
	  success: function( data ) {
			var menuContainer = ($('#'+menuContainerId));
			if(menuContainer) {
				menuContainer.html(data);
				showActionsMenu(menuOpener, menuContainerId);
			}
	  }
	});
}


//************************************************************************
//fonctions javascript utilis�es par l'upload de fichiers
//
//auteur : dnourry
//------------------------------------------------------------------------
//AjaxUploadMultipart
//post un formulaire dans une iframe
//
//Param�tres:
//	uploadform : l'objet formulaire concerne 
//  callback : la fonction a rapeller avec un document XML
//
//Valeur retourn�e: aucune
//------------------------------------------------------------------------
function AjaxUploadMultipart(uploadform,callback)
{

try
{
	var iframeId="AjaxUploadMultipart_"+ $(uploadform).attr("name");

	//name marche pas sur IE : var uploadiframe =$('<iframe />',{name:iframeId,id:iframeId}).appendTo($(uploadform));	

	var iframehtml='<iframe id="' + iframeId + '" name="' + iframeId + '" />'
	var uploadiframe =$(iframehtml).appendTo($(uploadform));	

	if($.browser.msie) 
		{
		uploadiframe.attr('src', 'javascript:false'); 
		}
	
	uploadiframe.css({ position: "absolute",top: "-1000px" ,left:"-1000px" });


	$(uploadform).attr("enctype","multipart/form-data").attr("encoding","multipart/form-data").attr("target",iframeId).attr("method","post");

	var upload_callback = function()
		{	
			try
				{
				var loadediframe=$('#'+iframeId).get(0);
				var contentiframe=null;
				if($.browser.msie)
					{					
					if (loadediframe.contentWindow.document.XMLDocument)
						{
						contentiframe=loadediframe.contentWindow.document.XMLDocument;
						}
					else if (loadediframe.contentWindow.document.documentElement)
						{
						
							if (loadediframe.contentWindow.document.documentElement.nodeName == "ajax-response")
									{
									contentiframe=loadediframe.contentWindow.document;
									}
							else
								{// Invalid response : Refire message
								$.post(actionUrl, { "NID": uploadform.NID.value, "USEAJAX": "true", "NMODE": "EVENT"},ajaxApply,"xml");
								}
						}
					}
				else
					{
					contentiframe=loadediframe.contentWindow.document;
					}
				if (contentiframe!=null)
					callback(contentiframe);
				}
			catch(e)
				{
				vdpShowError("Ajax Error: An exception occurred on multipart/form-data response : " +e.description);
				}

			setTimeout(function(){$('#'+ iframeId).unbind().remove();}, 1);
								
		};

	$(uploadform).submit();

	uploadiframe.bind("load",upload_callback);


}
catch(e)
{
	vdpShowError("Ajax Error: An exception occurred on multipart/form-data submit : " + e.description);
	try
		{
		event.returnValue = false;
		}
	catch(e){}
}



return false;

}

function getStaticString(key)
{
	var staticString = staticStrings[key];
   if(!staticString) {
      staticString = key;
   }
   return staticString;
}

//*****************************************************************************
//
// START - color picker functions
// 
//*****************************************************************************
function loadColorPicker( formName, pickerId, textId, throwEvents )
{
	var nbWidth = 10, nbHeight = 7;
	var sColorTable = "<table cellspacing='2' cellpadding='0'>";
	for(var y=0;y<nbHeight;y++)
	{
		sColorTable += "<tr>";		
		for(var x=0;x<nbWidth;x++)
		{
			var sVal  = Math.round(x/(nbWidth-1)*0xFF).toString(16).toUpperCase();
			while(sVal.length<2) sVal = "0"+sVal;
			var sColor = "";
			if((y+1)&0x1) sColor+=sVal; else sColor+="00";
			if((y+1)&0x2) sColor+=sVal; else sColor+="00";
			if((y+1)&0x4) sColor+=sVal; else sColor+="00";
			var tdId = "id"+sColor;
			sColorTable += "<td style=\"background-color:#"+sColor+";\" onclick=\"onCellColorClicked(event, '"+formName+"', '"+pickerId+"', '"+sColor+"', '"+textId+"', '"+throwEvents+"')\">&nbsp;</td>";
		}
		for(var x=Math.round(nbWidth/4);x<nbWidth-1;x++)
		{
			var sVal  = Math.round(x/(nbWidth-1)*0xFF).toString(16).toUpperCase();
			while(sVal.length<2) sVal = "0"+sVal;
			var sColor = "";
			if((y+1)&0x1) sColor+="FF"; else sColor+=sVal;
			if((y+1)&0x2) sColor+="FF"; else sColor+=sVal;
			if((y+1)&0x4) sColor+="FF"; else sColor+=sVal;
			var tdId = "id"+sColor;
			sColorTable += "<td style=\"background-color:#"+sColor+";\" onclick=\"onCellColorClicked(event, '"+formName+"', '"+pickerId+"', '"+sColor+"', '"+textId+"', '"+throwEvents+"')\">&nbsp;</td>";
		}
		sColorTable += "</tr>";
	}
	sColorTable += "</table>";
	sColorTable += "<div class=\"nocolor\" onclick=\"onCellColorClicked(event, '"+formName+"', '"+pickerId+"', 'transparent', '"+textId+"', '"+throwEvents+"')\">transparent</div>";
	document.getElementById('colorCells' + pickerId).innerHTML = sColorTable;
}

function onCellColorClicked( event, formName, pickerId, color, textId, throwEvents )
{
	// stop propagation
	stopPropagation( event );
	
	if ( color == '' )
	{
		$("#colorPicker" + pickerId).css("background-color", "");
	}
	else if ( color == 'transparent' )
	{
		$("#colorPicker" + pickerId).css("background-color", "transparent");
	}
	else
	{
		$("#colorPicker" + pickerId).css("background-color", '').css("background-color", '#' + color);
	}
	
	$("#colorCells" + pickerId).css("visibility", "hidden");
	$("#" + textId).val(color).change();

	if ( throwEvents == "true" )
	{
		vdpFireMessage(formName, pickerId, color);
	}
}
function stopPropagation( event )
{
  if (event && event.stopPropagation) event.stopPropagation();
  else if (window.event) window.event.cancelBubble = true;
}

function showColorPicker( formName, pickerId, textId, throwEvents )
{
	var picker = document.getElementById('colorCells' + pickerId);
	if(picker.style.visibility == "visible") {
		hideColorPicker(pickerId);
	}
	else {
		loadColorPicker(formName, pickerId, textId, throwEvents);
		picker.style.visibility = "visible";
	}
}

function hideColorPicker(pickerId){
	var picker = document.getElementById('colorCells' + pickerId);
	picker.style.visibility = "hidden";
}

function vdpOnKeyPress( event )
{
	return true;
}

function vdpOnKeyUp( formName, sourceId, triggerId, throwEvents, event )
{
	var color = $("#" + sourceId).val();
	if ( color.length == 6 )
	{
		$("#colorPicker" + triggerId).css("background-color", '').css("background-color", '#' + color);
		
		if ( throwEvents == "true" )
		{
			vdpFireMessage(formName, triggerId, color);
		}
	}
	else if ( color == 'transparent')
	{
		$("#colorPicker" + triggerId).css("background-color", '').css("background-color", 'transparent');
	}
	else
	{
		$("#colorPicker" + triggerId).css("background-color", '').css("background-color", '#000000');
	}
}

// TODO VLY
function checkColorValue(e)
{
	var keynum;
	var keychar;
	var numcheck;
	
	if(window.event) // IE
	{
		keynum = e.keyCode;
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which;
	}
	keychar = String.fromCharCode(keynum);
	numcheck = /[A-Fa-f0-9]/;

	return numcheck.test(keychar);
}

//*****************************************************************************
//
// END - color picker functions
// 
//*****************************************************************************

//*****************************************************************************
//
// BEGIN - lightbox functions
// 
//*****************************************************************************

/*
 * Stop le scroll de la fen�tre lorsque la lightbox est ouverte
 */
function bindLightBoxPreventScroll()
{
	if (!lightBoxVisible)
	{
		vdpLightBoxPreviousScrollTop = $(window).scrollTop();
		vdpLightBoxPreviousScrollLeft = $(window).scrollLeft();
		$(window).scrollTop(0);
		$(window).scrollLeft(0);
		$("body").css("overflow", "hidden");
	}
}

/*
 * R�active le scroll
 */
function unbindLightBoxPreventScroll()
{
	if (!lightBoxVisible)
	{
		$("body").css("overflow", "auto");
		$(window).scrollTop(vdpLightBoxPreviousScrollTop);
		$(window).scrollLeft(vdpLightBoxPreviousScrollLeft);
	}
}

function lightBoxShow(width, height) {

	
	if (!lightBoxVisible)
	{		
		var contentLayer = $('.lightbox-content');
		var lightboxWidget= $('.lightbox-background');
		// on bind les event pour stoper le scroll
		bindLightBoxPreventScroll();
		
		/* Si la lightbox est draggable, il faut g�rer un handle sinon il n'est m�me plus possible
		 * de s�lectionner du texte. Pour le moment on supprime donc le drag. 
		contentLayer.draggable({
		   containment: 'window'
		  }); */
		
		lightBoxWidth=width;
		lightBoxHeight=height;
		
		
		$(window).bind('resize',function () {
			lightBoxResize();
		});
		
		if($.browser.msie) 
		{
			lightboxWidget.show();
		}
		else
		{
			lightboxWidget.show("fade", {});
		}
		contentLayer.show();
		
		$(':tabbable:last',contentLayer).bind('blur',function (event){			
			var contentLayer = $('.lightbox-content');			
			$(':tabbable:first',contentLayer.find('form')).focus();			
			
		});
		
	}
  lightBoxVisible = true;
}

function lightBoxResize() {
	if (!lightBoxVisible)
		return;
	
	var screenWidget=$(window);
	var contentLayer = $('.lightbox-content');
	
	var  width=screenWidget.width(); 
	var height=screenWidget.height();
	
	if (lightBoxWidth && lightBoxHeight)
	{	
		var contentLayerWidth=Math.round(width*(lightBoxWidth/100));
		if (contentLayerWidth<1100)
			contentLayerWidth=1100;
		
		var contentLayerHeight=Math.round(height*(lightBoxHeight/100))
		if (contentLayerHeight<550)
			contentLayerHeight=550;
		
		contentLayer.css({width: contentLayerWidth, height: contentLayerHeight});
		
		lightBoxResizeSelector( contentLayer );
		
		var wizardArea=contentLayer.find("td:.wizard-guide");
				
		var scrollArea=contentLayer.find(".fields-area");
			if (scrollArea.length!=1)
			{
				scrollArea=contentLayer.find(".content-area");
			}
			if (scrollArea.length!=1)
			{
				scrollArea=contentLayer.find(".grid-content-zone");
			}
			if (scrollArea.length!=1)
			{
				scrollArea=contentLayer.find(".view-area");
			}
				
			if (scrollArea.length>0)
			{
				contentLayer.show();
						
				var contentLayerHeight=contentLayer.outerHeight();				
				
				var screen=contentLayer.find("DIV:last");
				
				var headerHeight=scrollArea.offset().top- contentLayer.offset().top;
				
				var footerHeight=screen.outerHeight() + 22; 
				
				var newScrollAreaHeight= contentLayerHeight - headerHeight -footerHeight;
				
				if (newScrollAreaHeight>0)
				{
					for (var i=0;i<scrollArea.length;i++)
					{
						$(scrollArea[i]).height(newScrollAreaHeight).css("overflow","auto");
					}
					
					if (wizardArea.length==1)
					{
						var informationsArea=contentLayer.find(".informations");
						if (informationsArea.length==1)
							informationsArea.height(newScrollAreaHeight).css("overflow","auto");
					}
				}
			}
	}
	else
	{
		contentLayer.css({width: '', height: ''});	
	}


	contentLayer.css({
		position:'fixed',		
		left: (width - contentLayer.outerWidth())/2,
		top: (height- contentLayer.outerHeight())/2
	});	

	var lightboxWidget=$('.lightbox-background');
	lightboxWidget.css({width:width,
											position:'fixed',
											height:height});
}

function lightBoxResizeSelector(lightboxContent) {
	if(lightboxContent.length > 0 && lightboxContent.find(".vui-screen-selector").length > 0)
	{
		if(vdpIsFakeLightboxContext) {
			fakeLightBoxResizeSelector( lightboxContent );
		}
		else {
			realLightBoxResizeSelector( lightboxContent );
		}
	}
}

function realLightBoxResizeSelector(lightboxContent) {
	if (!lightBoxVisible)
		return;
	
	if(lightboxContent.length > 0) {
		var viewAreas = lightboxContent.find("div.view-area");
		if (viewAreas.length > 0)
		{
			var viewArea = $(viewAreas[0]);
			var buttonArea = lightboxContent.find("DIV:last");
			var footerHeight = buttonArea.outerHeight() + 22;
			var lightboxContentHeight = lightboxContent.outerHeight();
			var headerHeight = viewArea.offset().top - lightboxContent.offset().top;
			
			var newScrollAreaHeight= lightboxContentHeight - headerHeight - footerHeight;
			for (var i = 0 ; i < viewAreas.length ; i++)
			{
				$(viewAreas[i]).css({height: newScrollAreaHeight + "px", "overflow" : "auto" });
			}
			
			var vuiSelecting = lightboxContent.find("div.vui-selecting");
			if (vuiSelecting.length > 0)
			{
				var selectingHeight = vuiSelecting.height();
				var selectorMenu = lightboxContent.find(".vui-selector-menu");
				if (selectorMenu.length > 0)
					selectorMenu.css({height: selectingHeight + "px", "overflow-y" : "auto", "overflow-x" : "hidden" });
			}
		}
	}
}

function lightBoxClose() {
	if (lightBoxVisible)
	{
	  lightBoxVisible = false;
	  $('.lightbox-content').hide();
		if($.browser.msie) 
		{
			$('.lightbox-background').hide();
		}
		else
		{
			$('.lightbox-background').hide("fade", {}, 300);
		}
		// On unbind les events relatifs au stop du scroll
		unbindLightBoxPreventScroll();
	}
}

function lightBoxAlert(title, info)
{
	lightBoxCreate(title, info, 
			[{label:"OK", action:function() { lightBoxClose(); }}]
		);
}

/**
 * 
 * @param title
 * @param info
 * @param style : error, warning, confirm, information
 * @param buttons
 * @param width
 * @param height
 */
function lightBoxCreate(title, info, style, buttons, width, height) {
	if (lightBoxVisible) return;
	
	var lightboxClientHtml = $('#lightbox-client').html(); 
	
	lightboxClientHtml = lightboxClientHtml.replace('TITLE', title);
	lightboxClientHtml = lightboxClientHtml.replace('INFO', info);
	lightboxClientHtml = lightboxClientHtml.replace('STYLE', style);
	
	var divScreen = $('.lightbox-content').find('div:first');
	divScreen.html(''); // IE trick to free up DOM objects and avoid memory leaks
	divScreen.html(lightboxClientHtml);
	
	// Pose des boutons
	if (buttons)
	{
		var buttonGroup = divScreen.find('.button-area').find('.buttons-group').find('ul');
		var buttonGroupHtml = buttonGroup.html();
		var result = "";
		for(var i=0 ; i<buttons.length ; i++)
			result += buttonGroupHtml;
		buttonGroup.html(result);
		
		var index = 1;
		buttonGroup.find('button').each(function() {
			var button = buttons[index-1];
			
			var cssClass = button["cssClass"];
			if (!cssClass)
				cssClass = "button" + index;			
			
			$(this).addClass(cssClass).find('span').html(button['label']);
			$(this).bind("click", button["action"]);			
			
			index++;
		});
	}
	
	lightBoxShow(width, height);
	lightBoxResize();
}
//*****************************************************************************
//
// END - lightbox functions
// 
//*****************************************************************************

//*****************************************************************************
//
// BEGIN - fake lightbox portal functions
// 
//*****************************************************************************
function fakeLightBoxInit(portletId)
{
	vdpFakeLightboxPortletOverflow = null;
	vdpFakeLightboxPortletId = portletId;
	
	$(window).bind('resize.fakeLightbox',function () {
		fakeLightBoxResize();
	});
	
	if(portletId != undefined && portletId != null)
	{
		vdpFakeLightboxPortletOverflow = $("#" + portletId).find(".inner").css("overflow-x");
		$("#" + portletId).find(".inner").css("overflow-x", "visible");
	}
	
	bindLightBoxPreventScroll();
	
	lightBoxVisible = true;
	vdpIsFakeLightboxContext = true;
	fakeLightBoxResize();
}


function fakeLightBoxClose()
{
	$(window).unbind('resize.fakeLightbox');
	lightBoxVisible = false;
	
	if(vdpFakeLightboxPortletId != undefined && vdpFakeLightboxPortletId != null && vdpFakeLightboxPortletOverflow != undefined && vdpFakeLightboxPortletOverflow != null)
	{
		$("#" + vdpFakeLightboxPortletId).find(".inner").css("overflow-x", vdpFakeLightboxPortletOverflow);
	}
	
	//On unbind les events relatifs au stop du scroll
	unbindLightBoxPreventScroll();
	
	vdpIsFakeLightboxContext = false;
	vdpFakeLightboxHeight = null;
	vdpFakeLightboxWidth = null;
	vdpFakeLightboxPortletOverflow = null;
	vdpFakeLightboxPortletId = null;
}

function fakeLightBoxResize() {
	var fakeLightBoxWidth = 75;
	var fakeLightBoxHeight = 75;
	var screenWidget=$(window);
	var contentLayer = $('.lightbox-content');
	
	var  width=screenWidget.width(); 
	var height=screenWidget.height();
		
	var lightboxWidget=$('.lightbox-background');
	lightboxWidget.css({width:width,
											position:'fixed',
											height:height});
	
	var contentLayerWidth=Math.round(width*(fakeLightBoxWidth/100));
	if (contentLayerWidth<1100)
		contentLayerWidth=1100;

	var contentLayerHeight=Math.round(height*(fakeLightBoxHeight/100))
	if (contentLayerHeight<550)
		contentLayerHeight=550;

	vdpFakeLightboxHeight = contentLayerHeight;
	vdpFakeLightboxWidth = contentLayerWidth;
		
	contentLayer.css({width: contentLayerWidth + "px",
											height: contentLayerHeight + "px",
											position:'absolute',		
											left: ((width - contentLayerWidth)/2) + "px",
											top: ((height- contentLayerHeight)/2) + "px"});
		
	lightBoxResizeSelector( contentLayer );
}

function fakeLightBoxResizeSelector(lightboxContent) {
	if (!lightBoxVisible)
		return;
	
	if(lightboxContent.length > 0) {
		var viewAreas = lightboxContent.find("div.view-area");
		var vuiSelecting = lightboxContent.find("div.vui-selecting");
		var selectorMenu = lightboxContent.find(".vui-selector-menu");
		if (viewAreas.length > 0 && vuiSelecting.length > 0 && selectorMenu.length > 0)
		{
			var viewArea = $(viewAreas[0]);
			var buttonArea = lightboxContent.find("DIV:last");
			var footerHeight = null;
			var headerHeight = null;
			if($.browser.msie)
			{
				// g�re les cas IE 9 et 10 on est en mode quirks il faut calculer autrement car les float ne sont pas pris en compte pendant le calcul
				footerHeight = buttonArea.outerHeight(true) + 22;
				var selectingOffsetTop = vuiSelecting.offset().top;
				var buttonAreaOffsetTop = viewArea.offset().top;
				var headerSelectingHeight = buttonAreaOffsetTop - selectingOffsetTop;
				var menuOffsetTop = selectorMenu.offset().top;
				var lightboxContentOffsetTop = lightboxContent.offset().top;
				
				headerHeight = headerSelectingHeight + (menuOffsetTop - lightboxContentOffsetTop);
			}
			else {
				footerHeight = buttonArea.outerHeight() + 22;
				headerHeight = viewArea.offset().top - lightboxContent.offset().top;
			}
			var newScrollAreaHeight= vdpFakeLightboxHeight - headerHeight - footerHeight;
			
			for (var i = 0 ; i < viewAreas.length ; i++)
			{
				$(viewAreas[i]).css({height: newScrollAreaHeight + "px", "overflow" : "auto"});
			}
		
			var selectingHeight = vuiSelecting.height();
			selectorMenu.css({height: selectingHeight + "px", "overflow-y" : "auto", "overflow-x" : "hidden" });
		}
	}
}

/**
 * Fonction de redimensionnement du s�lecteur en mode included
 */
function initSelectorIncluded( screenId )
{
	var $screen = $("#" + screenId);
	var $selecting = $screen.find("div.vui-selecting");
	if ($selecting.length > 0)
	{
		var selectingHeight = $selecting.height();
		var $selectorMenu = $screen.find(".vui-selector-menu");
		if ($selectorMenu.length > 0)
			$selectorMenu.css({height: selectingHeight + "px", "overflow-y" : "auto", "overflow-x" : "hidden" });
	}
}
//*****************************************************************************
//
// END - fake lightbox portal functions
// 
//*****************************************************************************

//*****************************************************************************
//
//BEGIN - CSS AJAX 
//
//*****************************************************************************


function ajaxApplyCSS(newCss)
{
	CSSsObject.addCSS(newCss);

}



function VdpCSSs() {
	this.CSSs = new Array();
	this.isloaded='loadstate';
	this.hascallback='callbackstate';
	
}
VdpCSSs.prototype.clear = function () {
	this.CSSs = new Array();
}

VdpCSSs.prototype.addCSS = function (newCss) {
	
	var links= $("head").children("link:last");
	var cssLink = $('<link />');
	cssLink.attr("type", "text/css");	
	cssLink.attr("rel","stylesheet");
	cssLink.attr("href",newCss); 
	
	this.loaded(newCss,false);
	var that=this;
	
	if (links.length>0)
		{	
		links.after(cssLink).load(function (){that.loaded(newCss,true)} );
		
		}
	else		
		{
		$('head').append(cssLink).load(function (){that.loaded(newCss,true)} );
		
		}
		
}

VdpCSSs.prototype.loaded = function (css,state) {
	if (state==true)
		{
		this.CSSs[css]=new Array();
		this.CSSs[css][this.isloaded] =true;
		this.CSSs[css][this.hascallback] =true;
		
		}
	else
		{
		this.CSSs[css]=new Array();
		this.CSSs[css][this.isloaded] =false;		
		this.CSSs[css][this.hascallback] =false;
		}
}

VdpCSSs.prototype.isready= function () {
	
	for (var id in this.CSSs) {
		if (this.CSSs[id][this.isloaded]!=true)
			{
			if (this.CSSs[id][this.hascallback]!=true)
				{
				this.CSSs[id][this.hascallback]=true;
				var that=this;
				//attention get marche pas sur tous les navigateurs dans ce cas (css) 
				//$.get(id,function (){that.loaded(id,true)});
				//attention always est consommateur
				//$.ajax({url:id}).always(function (){that.loaded(id,true)});
				///dataType:"text" evite a jquery d'interpreter le contenu
				$.ajax({url:id,dataType:"text" ,success: function (){that.loaded(id,true)},error: function (){that.loaded(id,true)}});
				}
				return false;
				
			}
			
			
	}
	return true;
}

//*****************************************************************************
//
//END - CSS AJAX 
//
//*****************************************************************************


//*****************************************************************************
//
//Start - DatePicker
//
//*****************************************************************************
/**
* Object qui va g�rer les datepicker pour les initialisations
* state 0 : init, 1 : create
* @returns
*/
function VdpDatepickers() {
	this.inputs = new Array();
	this.isOpen = false;
	this.states = new Array();
}

VdpDatepickers.prototype.register = function (id, idNavigator, options) {
																		if(this.inputs[idNavigator] == undefined || this.inputs[idNavigator] == null) {
																			this.inputs[idNavigator] = new Array();
																		}
																		if(this.states[idNavigator] == undefined || this.states[idNavigator] == null) {
																			this.states[idNavigator] = new Array();
																		}
																		
																		// On initialise e datepicker sans le cr�er
																		this.inputs[idNavigator][id] = options;
																		this.states[idNavigator][id] = 0;
																	};
/**
 * id : id champ datepicker
 * idNavigator : id du navigator
 * forceLoad : force le show du datepicker (gestion du focus sur le champ en erreur)
 */
VdpDatepickers.prototype.show = function (id, idNavigator, forceShow) {
																	if(forceShow || !vdpLoading)
																	{
																		// Le datepicker est juste initialis� on le cr�e
																		if(!this.isOpen && vdpIsset( this.states ) && vdpIsset( this.states[idNavigator] ) && this.states[idNavigator][id] == 0) {
																			this._unbind(id); // On unbind les events pour ne pas les executer � chaque fois																		
																			this._create(id, this.inputs[idNavigator][id]);
																			this.states[idNavigator][id] = 1;
																		}
																	}
																};
																
VdpDatepickers.prototype._unbind = function (idChamp) {
																		var selector = $( "#" + idChamp );
																		var selectorParent = $( "#" + idChamp ).parent();																		
																		
																		if(selectorParent.length != 0) {
																			selectorParent.unbind("mouseenter");
																		}	
																		selector.unbind("focus");
																	}
																
VdpDatepickers.prototype.deregister = function (idNavigator) {
																				if(this.inputs != undefined && this.inputs != null && this.inputs[idNavigator] != undefined && this.inputs[idNavigator] != null) {
																					// On d�truit le datepicker pour le d�truire avant de poster pour le retour en ajax 
																					for(id in this.inputs[idNavigator])
																					{
																						$datePicker = $( "#" + id );
																						if( $datePicker.length > 0 )
																							$datePicker.datepicker( "destroy" );
																					}
																					delete this.inputs[idNavigator];
																					delete this.states[idNavigator];
																				}
																			};

/**
* Cr�e le datepicker JQuery
*/
VdpDatepickers.prototype._create = function (idChamp, options) {
	var _self = this;
	var selector = $( "#" + idChamp );
	
	if( !vdpIsset( selector ) || selector.length <= 0 )
		return false;
	
	selector.datepicker({
		vdocBeforeShow: function(input, inst) {
		// TODO � voir si on garde apr�s les mises � jour JQuery, le 20/07/2012 :  VDOC Ajout d'une m�thode "vdocBeforeShow" pour recalculer le positionnement de la div du calendrier lorsque cette derni�re n'est pas correcte : ticket BUG-008276
			var calendar = inst.dpDiv;
			
			var windowWidth = $(window).width();
			var windowScrollLeft = $(window).scrollLeft();
			
			var calendarWidth = calendar.width();
			var calendarLeft = calendar.offset().left;
			
			var calendarHorizontalPosition = calendarLeft - windowScrollLeft;
			
			if(windowWidth < (calendarHorizontalPosition + calendarWidth)) {
				var newLeft = windowScrollLeft + windowWidth - calendarWidth;
				calendar.css("left", newLeft + "px");
			}
		},
		beforeShow: function() {
			_self.isOpen = true;
			$("#" + $.datepicker._mainDivId).unbind("click.stopPropagationDatePicker").bind("click.stopPropagationDatePicker", function (event) { stopPropagation( event ); });
		},
		onClose: function() {
			_self.isOpen = false;
		},
		showButtonPanel: true,
		showWeek: options.paramShowWeek,
		numberOfMonths: options.paramNumberOfMonths,
		changeMonth: options.paramChangeMonth,
		changeYear: options.paramChangeYear,
		showOtherMonths: options.paramShowOtherMonths,
		selectOtherMonths: options.paramShowOtherMonths
	});
	
	var dateFormat = selector.datepicker( "option", "dateFormat" );
	selector.datepicker( "option", "minDate", vdpTimestampDateFormat(options.startSelectionRange, dateFormat ));
	selector.datepicker( "option", "maxDate", vdpTimestampDateFormat(options.endSelectionRange, dateFormat ));
	
	if(options.paramDisplaydayofweek == "m" || options.paramDisplaydayofweek == "mo") {
		selector.datepicker( "option", "dayNames", vpdArrayUIDatePickerDayNames[options.paramDisplaydayofweek] );
		selector.datepicker( "option", "dayNamesShort", vpdArrayUIDatePickerDayNames[options.paramDisplaydayofweek] );
		selector.datepicker( "option", "dayNamesMin", vpdArrayUIDatePickerDayNames[options.paramDisplaydayofweek] );
	}
	else { // cas par d�faut ou l'on affiche le jour sur 3 lettres
		selector.datepicker( "option", "dayNames", vpdArrayUIDatePickerDayNames["mon"] );
		selector.datepicker( "option", "dayNamesShort", vpdArrayUIDatePickerDayNames["mon"] );
		selector.datepicker( "option", "dayNamesMin", vpdArrayUIDatePickerDayNames["mon"] );
	}
	
	if(options.customJQueryParams != null) {
		for(var key in options.customJQueryParams)
		{
			if(selector.datepicker( "option", key ) != undefined) {
				selector.datepicker( "option", key, options.customJQueryParams[key] );
			}
		}
	}
}

/**
* Initialise le datepicker
*/
function vdpInitUIDatePicker(idChamp, idNavigator, options) {
	datepickersObject.register(idChamp, idNavigator, options);
	
	var selector = $( "#" + idChamp );
	var selectorParent = $( "#" + idChamp ).parent();
	
	if(selectorParent.length != 0) {
		selectorParent.unbind("mouseenter").bind("mouseenter", function() {
			datepickersObject.show(idChamp, idNavigator, false);
		});	
	}
	
	selector.unbind("focus").bind("focus", function() {
		datepickersObject.show(idChamp, idNavigator, true);
		selector.datepicker("show");
	});
}

/**
* retourne la date format�e selon le timestamp et le format pass� en param�tre (voir vdpDateFormat pour les mask format)
* @param timestamp
* @param format
* @returns
*/
function vdpTimestampDateFormat(timestamp, format) {
	if(timestamp == null) {
		return null;
	}
	var date = new Date(timestamp);
	
	return vdpDateFormat(date, format);
}

/**
* Format la date pass�e en param�tre selon le param�tre format
* 
* Mask g�r�s :
* 		yyyy : ann�e sur 4 chiffres
* 		yy : ann�e sur 2 chiffres
*		mm : mois sur 2 chiffres
* 		dd : jour sur 2 chiffres
* 
* @param date
* @param format
* @returns {String}
*/
function vdpDateFormat(date, format) {
	var yyyy = date.getFullYear().toString();
	var yy = yyyy.toString().substring(2);
	var m = date.getMonth() + 1 ; // On ajoute 1 au mois, car ils sont index�s de 0 � 11
	var mm = m < 10 ? "0" + m : m.toString();
	var d = date.getDate();
	var dd = d < 10 ? "0" + d : d.toString();
	
	var dateStr = new String(format);
	dateStr = dateStr.replace(/yy/gi, yyyy);
	dateStr = dateStr.replace(/y/gi, yy);
	dateStr = dateStr.replace(/mm/gi, mm);
	dateStr = dateStr.replace(/dd/gi, dd);
	return dateStr;
}

function vdpOnClickTriggerUIDatePicker(idChamp, idNavigator)
{
	if( !vdpLoading )
	{
		var $datepicker = $("#" + idChamp );
		if( $datepicker.length > 0 )
		{
			vdpMessageFocusField( idChamp );
			datepickersObject.show(idChamp, idNavigator, false);
			$datepicker.datepicker("show");
		}
	}
}

function vdpOnClickResetUIDatePicker(idChamp, idNavigator) {
	if( !vdpLoading )
	{
		datepickersObject.show(idChamp, idNavigator, false);
		var selector = $( "#" + idChamp ); 
		if( selector.length > 0 )
		{
			selector.datepicker("setDate" , null);
			selector.change();
		}
	}
}


/*****************************************************************************
 * Localisation du datepicker
 ****************************************************************************/
function vdpDatePickerCheckDateFormat(inComingFormat) {
	var finalFormat = inComingFormat.toLowerCase();
	
	if(finalFormat.indexOf("yyyy") != -1) {
		finalFormat = finalFormat.replace("yyyy", "yy");
	}
	else if(finalFormat.indexOf("yy") != -1) {
		finalFormat = finalFormat.replace("yy", "y");
	}
	
	return finalFormat;
}

function vdpLocalizeDatePicker(langue, dateFormat) {
	var configDateFormat = vdpDatePickerCheckDateFormat(dateFormat);
	
	var configFirstDay = 0;
	if(langue == 'fr' || langue == 'de') {
		configFirstDay = 1;
	}
	
	var configMonthName = [getStaticString('LG_DATE_PICKER_MONTH_NAME_JANUARY'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_FEBRUARY'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_MARCH'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_APRIL'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_MAY'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_JUNE'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_JULY'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_AUGUST'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_SEPTEMBER'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_OCTOBER'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_NOVEMBER'),
			             getStaticString('LG_DATE_PICKER_MONTH_NAME_DECEMBER')];
	
	$.datepicker.regional[langue] = {
			closeText: getStaticString('LG_DATE_PICKER_CLOSE_TEXT'),
			prevText: getStaticString('LG_DATE_PICKER_PREVIOUS_TEXT'),
			nextText: getStaticString('LG_DATE_PICKER_NEXT_TEXT'),
			currentText: getStaticString('LG_DATE_PICKER_CURRENT_TEXT'),
			monthNames: configMonthName,
			monthNamesShort: configMonthName,
			weekHeader: '',
			dateFormat: configDateFormat,
			firstDay: configFirstDay,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
	
		$.datepicker.setDefaults($.datepicker.regional[langue]);
		
		vpdArrayUIDatePickerDayNames["mon"] = new Array();
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SUNDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MONDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_TUESDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_WEDNESDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_THURSDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_FRIDAY'));
		vpdArrayUIDatePickerDayNames["mon"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SATURDAY'));

		vpdArrayUIDatePickerDayNames["mo"] = new Array();
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_SUNDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_MONDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_TUESDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_WEDNESDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_THURSDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_FRIDAY'));
		vpdArrayUIDatePickerDayNames["mo"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_SHORT_SATURDAY'));
		

		vpdArrayUIDatePickerDayNames["m"] = new Array();
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_SUNDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_MONDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_TUESDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_WEDNESDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_THURSDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_FRIDAY'));
		vpdArrayUIDatePickerDayNames["m"].push(getStaticString('LG_DATE_PICKER_DAY_NAME_MIN_SATURDAY'));
}

//*****************************************************************************
//
//End - DatePicker
//
//*****************************************************************************
//*****************************************************************************
//
//Fonctions communes - Combobox simples et multiples
//
//*****************************************************************************
function vdpCommonSelectBindScroll(idNavigator, scrollableIdElement) {
	if(vdpSelectCommonBindScroll[idNavigator] == undefined || vdpSelectCommonBindScroll[idNavigator] == null) {
		if(idNavigator != null && scrollableIdElement != null ) {
			vdpSelectCommonBindScroll[idNavigator] = $("#" + scrollableIdElement);
			vdpSelectCommonBindScroll[idNavigator].unbind("scroll.combosEvent").bind("scroll.combosEvent", function (event) {
				vdpCommonSelectCloseAllCombo();
			});
			// Lorsque l'on a un parent scrollable on s'attache �galement sur le scroll de la fen�tre pour fermer les combos au cas ou on a un scroll sur la fen�tre  
			$(window).unbind("scroll.combosEvent").bind('scroll.combosEvent',function (event) {
				vdpCommonSelectCloseAllCombo();
			});
		}
		else {
			vdpSelectCommonBindScroll[idNavigator] = true;
			$(window).unbind("scroll.combosEvent").bind('scroll.combosEvent',function (event) {
				vdpCommonSelectCloseAllCombo();
			});
		}
	}	
}

function vdpCommonClearCombos(navigatorId) {
	if(vdpSelectCommonBindScroll[navigatorId] != undefined && vdpSelectCommonBindScroll[navigatorId] != null) {
		if(vdpSelectCommonBindScroll[navigatorId] == true)
			$(window).unbind("scroll.combosEvent");
		else if(vdpSelectCommonBindScroll[navigatorId].length != 0) {
			vdpSelectCommonBindScroll[navigatorId].unbind("scroll.combosEvent");
			$(window).unbind("scroll.combosEvent");
		}
		
		delete vdpSelectCommonBindScroll[navigatorId];
	}
	
	for(id in vdpSimpleSource) {
		if(vdpSimpleSource[id]["navigatorId"] == navigatorId) {
			for(index in vdpSimpleSource[id]) {
				delete vdpSimpleSource[id][index];
			}
			delete vdpSimpleSource[id];
		}
	}
	vdpSimpleSelectUnbindKeyDownEvent( null );
	
	for(id in vdpMultipleSource) {
		if(vdpMultipleSource[id]["navigatorId"] == navigatorId) {
			for(index in vdpMultipleSource[id]) {
				delete vdpMultipleSource[id][index];
			}
			delete vdpMultipleSource[id];
		}
	}
	vdpMultipleSelectUnbindKeyDownEvent( null );
}

function vdpCommonSelectOnClickLiBrowse(id, isMultiple, event) {
	if(isMultiple) {
		vdpMultipleSelectClickOpener( id, event );
	}
	else {
		vdpSimpleSelectClickOpener( id, event );
	}
}

function vdpCommonSelectGetDivItems(isMultiple, id) {
	if(vdpCommonGlobalDivItem == null || vdpCommonGlobalDivItem.length == 0) {
		vdpCommonGlobalDivItem = $("#vui-combobox-div-items");
		vdpCommonGlobalDivItemBaseCssClass = vdpCommonGlobalDivItem.attr("class");
	}
	
	if(isMultiple) {
		if(vdpSelectMultipleDivItems == undefined || vdpSelectMultipleDivItems == null || vdpSelectMultipleDivItems.length == 0 || id != vdpSelectCommonCurrentComboId) {
			var str = '<ul id="vui-combobox-menu" class="vui-combobox-menu">';
			str += '	<li class="vui-combobox-item vui-combobox-selectall" id="liCheckAllItems" onmouseover="vdpMultipleSelectLiHover(\'liCheckAllItems\', \'' + id + '\');" onmouseout="vdpCommonsSelectLiUnhover(\'liCheckAllItems\')"><label><input type="checkbox" class="checkbox" id="checkAllItems" onclick="vdpMultipleSelectSelectionnerTout(\''+id+'\', event);" />' + getStaticString( "LG_MULTIPLE_SELECT_LIST_SELECT_ALL" ) + '</label></li>';
			str += '</ul>';
			str += '<ul id="vui-combobox-value" class="vui-combobox-value">';
			str += '</ul>';
			if(vdpMultipleSource[id]['isAjax'] && (vdpMultipleSource[id]['isVisibleOpener'])) {
					str += '<ul id="vui-combobox-menu-browse" class="vui-combobox-menu-browse">';
					str += '	<li class="vui-combobox-item vui-combobox-browse" id="vui-combobox-browse" onclick="vdpCommonSelectOnClickLiBrowse(\'' + id + '\', true, event);" onmouseover="vdpMultipleSelectLiHover(\'vui-combobox-browse\', \'' + id + '\');" onmouseout="vdpCommonsSelectLiUnhover(\'vui-combobox-browse\')">' + getStaticString( "LG_SELECTOR_LI_OPENER_BROWSE" ) + '</li>';
					str += '</ul>';

			}
			vdpCommonGlobalDivItem.empty().append($(str));
			delete(vdpSelectMultipleDivItems);
			vdpSelectMultipleDivItems = vdpCommonGlobalDivItem;
			
			vdpSelectCommonCurrentComboId = id;
		}
		
		if(vdpMultipleSource[id]['cssClass'] != null) {
			vdpSelectMultipleDivItems.removeClass().addClass(vdpCommonGlobalDivItemBaseCssClass).addClass(vdpMultipleSource[id]['cssClass']);
		}
		else {
			vdpSelectMultipleDivItems.removeClass().addClass(vdpCommonGlobalDivItemBaseCssClass);
		}
		
		vdpCommonSelectBindScroll( vdpMultipleSource[id]['navigatorId'], vdpMultipleSource[id]['scrollableId'] );
		return vdpSelectMultipleDivItems;
	}
	else {
		if(vdpSelectSimpleDivItems == undefined || vdpSelectSimpleDivItems == null || vdpSelectSimpleDivItems.length == 0 || id != vdpSelectCommonCurrentComboId) {
			var str = '<ul tabindex="-1" id="vui-combobox-value" class="vui-combobox-value"></ul>';
			if(vdpSimpleSource[id]['isAjax'] && (vdpSimpleSource[id]['isVisibleOpener']))
			{
				str += '<ul id="vui-combobox-menu-browse" class="vui-combobox-menu-browse">';
				str += '	<li class="vui-combobox-item vui-combobox-browse" id="vui-combobox-browse" onclick="vdpCommonSelectOnClickLiBrowse(\'' + id + '\', false, event);" onmouseover="vdpSimpleSelectLiHover(\'vui-combobox-browse\', \'' + id + '\');" onmouseout="vdpCommonsSelectLiUnhover(\'vui-combobox-browse\')">' + getStaticString( "LG_SELECTOR_LI_OPENER_BROWSE" ) + '</li>';
				str += '</ul>';

			}
			vdpCommonGlobalDivItem.empty().append($(str));
			vdpSelectSimpleDivItems = vdpCommonGlobalDivItem;
			
			vdpSelectCommonCurrentComboId = id;
		}
		
		if(vdpSimpleSource[id]['cssClass'] != null) {
			vdpSelectSimpleDivItems.removeClass().addClass(vdpCommonGlobalDivItemBaseCssClass).addClass(vdpSimpleSource[id]['cssClass']);
		}
		else {
			vdpSelectSimpleDivItems.removeClass().addClass(vdpCommonGlobalDivItemBaseCssClass);
		}
		
		vdpCommonSelectBindScroll( vdpSimpleSource[id]['navigatorId'], vdpSimpleSource[id]['scrollableId'] );
		return vdpSelectSimpleDivItems;
	}
}


function vdpCommonSelectStrongValue(value, searchValue, isStrong) {
	if(searchValue == "" || !isStrong) {
		return value;
	}
	
	var trimSearch = $.trim(searchValue);
	var searches = trimSearch.split(' ');
	var regEx = "";
	
	for(i in searches) {
		regEx += searches[i] + "|";
	}
	regEx = regEx.substring(0 , regEx.length - 1);
	
	var reg = new RegExp("(" + regEx + ")", "gi");
	return value.replace(reg, '<strong>$1</strong>');
}

function vdpCommonSelectCloseOtherCombo(id, isMultiple) {
	if(vdpSelectCommonCurrentComboId == null)
		return;
	
	if(id == null) {
		vdpCommonSelectCloseAllCombo();
	}		
	else if(vdpSelectCommonCurrentComboId != id) {
		if(vdpMultipleSource[vdpSelectCommonCurrentComboId] != undefined && vdpMultipleSource[vdpSelectCommonCurrentComboId] != null)
			vdpMultipleSelectHideAutocomplete(vdpSelectCommonCurrentComboId, true, true);
		else if(vdpSimpleSource[vdpSelectCommonCurrentComboId] != undefined && vdpSimpleSource[vdpSelectCommonCurrentComboId] != null)
			vdpSimpleSelectHideAutocomplete(vdpSelectCommonCurrentComboId, false);
	}		
}

function vdpCommonSelectCloseAllCombo() {
	for(id in vdpSimpleSource) {
		vdpSimpleSelectHideAutocomplete(id, false);
	}
	
	for(id in vdpMultipleSource) {
		vdpMultipleSelectHideAutocomplete(id, true, true);
	}
}

function vdpCommonSelectCloseCombosFireMessage() {
	// Si le vdpFireMessage() n'est pas lanc� par un throwEvents on cache les autres combos, sinon on ne fait rien, la page va �tre recharg�e
	// Sert � g�rer le cas des lightbox pour ne pas se retrouver avec des combos ouvertes apr�s la fermture de la ligthbox
	if(!vdpSelectCommonThrowEventsContext) {
		vdpCommonSelectCloseAllCombo();
	}
}


function vdpCommonSelectShowHideLoading(id, isLoading, isMultiple) {
	var cssClass = "vui-selector-loading";
	var selectorInput;
	var selectorDiv = vdpCommonSelectGetDivItems( isMultiple, id );
	
	if(isMultiple) {
		selectorInput = vdpMultipleSource[id]['selectorInput'];
	}
	else {
		selectorInput =	vdpSimpleSource[id]['selectorInputAC'];
	}
	
	if(isLoading) {
		selectorInput.addClass(cssClass);
		selectorDiv.addClass(cssClass);
	}
	else {
		selectorInput.removeClass(cssClass);
		selectorDiv.removeClass(cssClass);
	}
}

function vdpCommonSelectFindClassComponentSize(key) {
	if(key == 0) {
		return "vui-combobox-verysmall";
	}
	else if(key == 1) {
		return "vui-combobox-small";
	}
	else if(key == 2) {
		return "vui-combobox-medium";
	}
	else if(key == 3) {
		return "vui-combobox-large";
	}
	else if(key == 4) {
		return "vui-combobox-auto";
	}
	else if(key == 5) {
		return "vui-combobox-small";
	}
	else if(key == 6) {
		return "vui-combobox-large";
	}
	else {
		return "vui-combobox-medium";
	}
}

function vdpCommonSelectGetAutoWidth(vdpSource, id, isMultiple) {
	var source = vdpSource['source'];
	var divValues = vdpCommonSelectGetDivItems(isMultiple, id);
	divValues.attr("style", "");
	divValues.hide();

	ul = divValues.find("ul#vui-combobox-value");
	
	ul.empty();
	var isResult = false;
		
	var group = -1;
	var previousGroup = -1;
	var isResultInGroup = false;
	var ulContentStr = "";
	
	for(elt in source) {
		// Gestion des groupes dans le cas ou il y en a, on ajoute les <li> de groupe
		if(elt.indexOf("-") != -1) {
			var tabGroup = elt.split("-");
			group = tabGroup[0];
			if(group != previousGroup) {
				ulContentStr += '<li class="vui-combobox-group">' + vdpSource['arrGroupName'][group] + '</li>';
				previousGroup = group;
				isResultInGroup = false;
			}
		}
		
		if(isMultiple) {
			ulContentStr += '<li class="vui-combobox-item vui-combobox-item-selected"><label><input type="checkbox" class="checkbox" />' + source[elt] + '</label></li>';
		}
		else {
			ulContentStr += '<li class="vui-combobox-item vui-combobox-item-selected" role="option" role="listitem" tabindex="-1">' + source[elt] + '</li>';
		}
		isResult = true;
		isResultInGroup = true;
	}
	
	// Si on a aucun r�sultat on informe l'utilisateur
	if(!isResult) {
		ulContentStr = '<li class="vui-combobox-no-item">' + getStaticString( "LG_COMMON_SELECT_LIST_NO_VALUE_AVAILABLE" ) + '</li>';
	}
	
	$(ulContentStr).appendTo(ul);
	
	var width = divValues.outerWidth(true);
	ul.empty();
	return width;
}

function vdpCommonSelectSetFirstLastClassList(id, isMultiple) {
	var list = vdpCommonSelectGetDivItems( isMultiple, id );
	options = list.find('.vui-combobox-item');
	options.first().addClass("first"); 
	options.last().addClass("last");
}

function calcOffset(list, options, selector) {
	var itemsList = list.find("ul").find('li');
	
	var offset = 0; 
	var selectedNdx = itemsList.index(selector);
	var singleHeight = 0;

	for (var ndx = 0; ndx < selectedNdx; ndx++) {
		offset += itemsList.eq(ndx).height();
		singleHeight = itemsList.eq(ndx).height();
	}

	return offset;
}

/**
 * Si chaque valeur contenue dans le param�tre search (split sur espace) est retrouv�e dans le param�tre value on retourne true sinon false
 * 
 * @param value la valeur dans laquelle on recherche
 * @param search les valeurs recherch�es, chaque valeur est s�par�e par un espace
 * @returns {Boolean} 
 */
function vdpCommonSelectSearchEachWordInValue(value, search) {	
	if(search == "") {
		return true;
	}
	var trimSearch = $.trim(search);
	var searches = trimSearch.split(' ');
	
	for(i in searches) {
		searchStr = searches[i];
		if(value.toUpperCase().indexOf(searchStr.toUpperCase()) == -1)
			return false;
	}
	return true;
}

function vdpCommonSelectRollover(isHover, self, event) {
	var cssClass = $(self).attr("class");
	var hoverCssClass = null;
	
	if(cssClass != null && cssClass != "") {
		if(cssClass.indexOf(" ") != -1) {
			var arr = cssClass.split(" ");
			cssClass = arr[0];
		}
		hoverCssClass = cssClass + "-hover";
		if(isHover)
			$(self).addClass(hoverCssClass);
		else $(self).removeClass(hoverCssClass);
	}
	
	if(event != undefined && event != null)
	{
		stopPropagation( event );
	}
}

function vdpCommonsSelectLiUnhover(idLi) {
	$("#" + idLi ).removeClass("ariaSelected");
}
//*****************************************************************************
//
//Start - Combobox simples et multiples non predictive
//
//*****************************************************************************
function vdpSimpleSelectNoPredictiveUnselectValue(idHidden, throwEventsCallBack)
{
	vdpHideTooltip();
	$("#" + idHidden).val("");
	var selectorDivSelectedItem = $("#vui-combobox-" + idHidden + "-selected-items");
	
	if(selectorDivSelectedItem.length > 0)
		selectorDivSelectedItem.remove();
	
	if( throwEventsCallBack != undefined && throwEventsCallBack != null && throwEventsCallBack != "")
		eval(throwEventsCallBack);
}

function vdpMultipleSelectNoPredictiveUnselectValue(idHidden, index, throwEventsCallBack)
{
	vdpHideTooltip();
	var hiddenVal = $("#" + idHidden).val();
	
	var hiddenSplit = hiddenVal.split(',');
	var newHiddenVal = "";
	for(indexHiddenSplit in hiddenSplit)
	{
		if(hiddenSplit[indexHiddenSplit] != index)
		{
			newHiddenVal += hiddenSplit[indexHiddenSplit]+ ",";
		}
	}
	$("#" + idHidden).val(newHiddenVal);
	
	if( throwEventsCallBack != undefined && throwEventsCallBack != null && throwEventsCallBack != "")
		eval(throwEventsCallBack);
}
//*****************************************************************************
//
//Start - Combobox simples et multiples non predictive
//
//*****************************************************************************

//*****************************************************************************
//
//Start - Combobox simples
//
//*****************************************************************************
function vdpSimpleSelectLiHover(idLi, id) {
	vdpSimpleSource[id]['selectorInputAC'].blur();
	var list = vdpCommonSelectGetDivItems( false, vdpSelectCommonCurrentComboId );
	var options = list.find("ul").find('li.vui-combobox-item');
	
	var curOption = options.filter('.ariaSelected'); 
	
	// On supprime le hover pr�c�dent si il existe
	if(curOption.length > 0) {
		curOption.removeClass("ariaSelected");
	}
	// On ajoute le hover sur l'objet courant
	$("#" + idLi ).addClass("ariaSelected");
}

var vdpSimpleSelectDoKeyDown = function(event) {
	var id = vdpSelectCommonCurrentComboId;	
	switch(event.keyCode) {
		case 27: // echap
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].focus();
			vdpSimpleSelectHideAutocomplete(id, false);
		break;
		case 9: // tab
			vdpSimpleSource[id]['selectorInputAC'].focus();
			vdpSimpleSelectHideAutocomplete(id, false);
		break;
		case 13: // entr�e
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].focus();
			var list = vdpCommonSelectGetDivItems( false, id );
			var ul = list.find("ul");
			options = ul.find('li');
			
			var curOption = options.filter('.ariaSelected');
			var idItem = curOption.attr('id');
			if(idItem != undefined && idItem != null && idItem != 'vui-combobox-browse' ) {
				index = idItem.replace('item-' + id + '-','');
				vdpSimpleSelectSelectValue(id, index, true, true);
			}
			else {
				vdpCommonSelectOnClickLiBrowse(id, false, event);
			}
		break;
		case 38: // fl�che haut
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].blur();
			var list = vdpCommonSelectGetDivItems( false, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected'); 
			var curNdx = options.index(curOption);
			
			if(curNdx == -1) {
				curOption = options.filter('.vui-combobox-item-selected');
				curNdx = options.index(curOption); 
			}
			
			if (curNdx > 0) {
				var prev = options.eq(curNdx - 1); 

				if (vdpSimpleSource[id]['open'] == true) {
					curOption.removeClass('ariaSelected'); 
					prev.addClass('ariaSelected');
					list.scrollTop(calcOffset(list, options, prev)); 
				}
			}
			else {
				vdpSimpleSource[id]['selectorInputAC'].focus();
			}
		break;
		case 40: // fl�che bas
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].blur();
			var list = vdpCommonSelectGetDivItems( false, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			var curNdx = options.index(curOption);
			
			if(curNdx == -1) {
				curOption = options.filter('.vui-combobox-item-selected');
				curNdx = options.index(curOption); 
			}				
			
			if (curNdx < options.length - 1) {
				var next = options.eq(curNdx + 1); 

				if (vdpSimpleSource[id]['open'] == true) {
					curOption.removeClass('ariaSelected');
					next.addClass('ariaSelected');
					list.scrollTop(calcOffset(list, options, next)); 
				}
			}
		break;
		case 33: // page up
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].blur();
			var list = vdpCommonSelectGetDivItems( false, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			curOption.removeClass('ariaSelected');
			
			var firstOption = options.filter('.first');
			firstOption.addClass('ariaSelected');
			list.scrollTop(calcOffset(list, options, firstOption));
		break;
		case 34: // page down
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpSimpleSource[id]['selectorInputAC'].blur();
			var list = vdpCommonSelectGetDivItems( false, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			curOption.removeClass('ariaSelected');
			
			var lastOption = options.filter('.last');
			lastOption.addClass('ariaSelected');
			list.scrollTop(calcOffset(list, options, lastOption));
		break;
	}
}

function vdpSimpleSelectBindKeyDownEvent(id) {
	registerOnKey(vdpSimpleSelectDoKeyDown);
}

function vdpSimpleSelectUnbindKeyDownEvent(id) {
	unregisterOnKey(vdpSimpleSelectDoKeyDown);
}

function vdpSimpleSelectShowSelectedItem(id) {
	if(vdpSimpleSource[id]['indexSelected'] != "") {
		var list = $("#vui-combobox-"+id+"-items");
		var options = list.find("ul").find('li.vui-combobox-item');
		
		var curOption = options.filter('.vui-combobox-item-selected');
		
		list.scrollTop(calcOffset(list, options, curOption)); 
	}
}

/**
 * 
 * @param id
 * @param idHidden
 * @param resetType  0 : ALWAYS, 1 : CREATION_ONLY, 2 : NEVER
 * @param componentSize
 * @param source
 * @param indexSelected
 * @param arrGroupName
 */
function vdpSimpleSelect(id, idHidden, resetType, componentSize, source, indexSelected, arrGroupName, pathImgTransparent, displaySelectionOutside, isAjax, urlCallAjax, timeBeforeFireRequest, lengthBeforeFireRequest, urlOpenSelector, maxDisplayedItems, navigatorId, scrollableId, throwEventsCallback, cssClass, isDocumentChangedScript, documentChangedScript, tooltipMouseOver, tooltipMouseOut, isVisibleOpener) {
	vdpSimpleSource[id] = new Array();
	vdpSelectCommonThrowEventsContext = false;
	vdpSimpleSource[id]['source'] = source;
	vdpSimpleSource[id]['open'] = false;
	vdpSimpleSource[id]['idHidden'] = idHidden;
	vdpSimpleSource[id]['indexSelected'] = "";
	vdpSimpleSource[id]['resetType'] = resetType;
	vdpSimpleSource[id]['pathImgTransparent'] = pathImgTransparent;
	vdpSimpleSource[id]['displaySelectionOutside'] = displaySelectionOutside;
	vdpSimpleSource[id]['maxDisplayedItems'] = maxDisplayedItems;
	vdpSimpleSource[id]['cssClass'] = cssClass;
	
	// Si on est en mode ajax on ajoute les param�tres requis pour aller chercher dans le selecteur
	if(isAjax) {
		vdpSimpleSource[id]['isAjax'] = isAjax;
		vdpSimpleSource[id]['urlCallAjax'] = urlCallAjax;
		vdpSimpleSource[id]['urlOpenSelector'] = urlOpenSelector;
		vdpSimpleSource[id]['timeBeforeFireRequest'] = timeBeforeFireRequest;
		vdpSimpleSource[id]['lengthBeforeFireRequest'] = lengthBeforeFireRequest;
		vdpSimpleSource[id]['lastSearch'] = "";
		vdpSimpleSource[id]['isVisibleOpener'] = isVisibleOpener;
		
		if(tooltipMouseOver != '' && tooltipMouseOut != '') {
			vdpSimpleSource[id]['tooltips'] = new Array();
   		vdpSimpleSource[id]['tooltips'][indexSelected] = new Array();
			vdpSimpleSource[id]['tooltips'][indexSelected]['mouseover'] = tooltipMouseOver;
			vdpSimpleSource[id]['tooltips'][indexSelected]['mouseout'] = tooltipMouseOut;
		}
	}

	vdpSimpleSource[id]['widthDivItems'] = null;
	vdpSimpleSource[id]['widthInput'] = null;	
	vdpSimpleSource[id]['selectorImgDelete'] = $("#vui-delete-" + id);
	vdpSimpleSource[id]['selectorInputAC'] = $("#" + id);
	vdpSimpleSource[id]['selectorVuiComboBox'] = $("#vui-combobox-" + id )
	vdpSimpleSource[id]['selectorOpener'] = $("#ui-combobox-opener-" + id);
	vdpSimpleSource[id]['selectorHidden'] = $("#" + idHidden);
	
	vdpSimpleSource[id]['throwEventsCallback'] = throwEventsCallback;

	vdpSimpleSource[id]['navigatorId'] = navigatorId;
	vdpSimpleSource[id]['scrollableId'] = scrollableId;
	
	// Calcul de l'image de suppression
	vdpSimpleSource[id]['widthDelete'] = vdpSimpleSource[id]['selectorImgDelete'].outerWidth(true);
		
	if(displaySelectionOutside) {
		vdpSimpleSource[id]['selectorOut'] = $('<div class="vui-combobox-selected-items"  id="vui-combobox-' + id + '-out-selected-item"></div>');
		vdpSimpleSource[id]['selectorSpanSelected'] =$('<span id="vui-combobox-selected-' + id + '"></span>');
		vdpSimpleSource[id]['selectorSpanSelected'].appendTo(vdpSimpleSource[id]['selectorOut']);
		
		var clone = vdpSimpleSource[id]['selectorImgDelete'].clone();
		vdpSimpleSource[id]['selectorImgDelete'].remove();
		vdpSimpleSource[id]['selectorImgDelete'] = clone;
		
		vdpSimpleSource[id]['selectorHidden'].after(vdpSimpleSource[id]['selectorOut']);
	}
	
	if(arrGroupName != undefined && arrGroupName != null) {
			vdpSimpleSource[id]['arrGroupName'] = arrGroupName;
	}
	
	if( resetType == 2 ) {
		vdpSimpleSelectHandleAllowReset(id, false, indexSelected);
	}
	else if(!displaySelectionOutside) {
		vdpSimpleSource[id]['selectorImgDelete'].hide();
	}

	var widthUl = vdpCommonSelectGetAutoWidth( vdpSimpleSource[id], id, false );
	var widthOpener = 25;
	
	vdpSimpleSource[id]['widthInput'] = widthUl;		
	vdpSimpleSource[id]['widthDivItems'] = widthUl +  widthOpener;
	
	if(componentSize == 4) {
		vdpSimpleSource[id]['isAutoComponentSize'] = true;
		var width =  vdpSimpleSource[id]['widthInput'] + vdpSimpleSource[id]['widthDelete'];  
		vdpSimpleSource[id]['selectorInputAC'].css("width", width + "px");
	}
	else {
		vdpSimpleSource[id]['isAutoComponentSize'] = false;
	}
	
	var widthVuiCombobox = vdpSimpleSource[id]['selectorVuiComboBox'].width(); 
	if(widthVuiCombobox > widthUl) {
		vdpSimpleSource[id]['widthDivItems'] = widthVuiCombobox;
	}
	
	if(indexSelected != undefined && indexSelected != null) {
		vdpSimpleSelectSelectValue( id, indexSelected, false, false );
	}

	vdpCommonSelectGetDivItems( false, id ).hide();
	vdpSimpleSource[id]['open'] = false;
	
	// On le fait � la fin pour ne pas le d�clencher pendant l'init de la valeur selectionn�e
	vdpSimpleSource[id]['isDocumentChangedScript'] = isDocumentChangedScript;
	if(isDocumentChangedScript)
		vdpSimpleSource[id]['documentChangedScript'] = documentChangedScript;
	else
		vdpSimpleSource[id]['documentChangedScript'] = "";
}

function vdpSimpleSelectHandleAllowReset(id, throwEvent, indexSelected) {
	// Si on a rien de s�lectionn� on s�lectionne la premi�re valeur par d�faut
	if(indexSelected == undefined || indexSelected == null) {
		var defaultValue = null;
		for(elt in vdpSimpleSource[id]['source']) {
			defaultValue = elt;
			break;
		}
		
		if(defaultValue != null) {
			vdpSimpleSelectSelectValue(id, defaultValue, throwEvent, false);
		}
	}
	
	// Cas ou la fl�che n'est pas pr�sente on ne peut pas r�initialiser la valeur
	vdpSimpleSource[id]['selectorImgDelete'].remove();
	vdpSimpleSource[id]['widthDelete'] = 0;
}


function vdpSimpleSelectOnClickEmptyValue(event, id) {
	vdpSimpleSelectUnselectValue( event, id );
	vdpSimpleSelectHideAutocomplete( id, true )
}

function vdpSimpleSelectKeyUpSelector( id, event ) {
	if(event != null && (event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13)) {
		// Surcharge du tab pour ne pas ouvrir l'autocompletion
		return;
	}
	vdpCommonSelectCloseOtherCombo( id, false );
	vdpCommonsSimpleSelectorCallAjaxValues( id );
}

function vdpSimpleSelectKeyUp(id, showAllValues, event) {
	if(event != null && (event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13)) {
		// Surcharge du tab pour ne pas ouvrir l'autocompletion
		return;
	}

	if(!showAllValues) {
		// On affiche le cadre sur le input pour indiquer que la valeur n'est pas correcte
		vdpSimpleSource[id]['selectorVuiComboBox'].addClass("vui-combobox-change");
	}

	vdpCommonSelectCloseOtherCombo( id, false );
	vdpSimpleSelectShowSelectedItem(id);	
	var input = vdpSimpleSource[id]['selectorInputAC'];
	var divValues = vdpCommonSelectGetDivItems( false, id);
	divValues.css("height", "auto");
	var ul = divValues.find("ul#vui-combobox-value");
	ul.empty();
	var isResult = false;
	var source = vdpSimpleSource[id]['source'];
	var divValuesHeight = 0;
	var inputLabel = input.val();
	
	var group = -1;
	var previousGroup = -1;
	var isResultInGroup = false;
	var i = 0;
	var isFirstValue = true;
	for(elt in source) {
		// Gestion des groupes dans le cas ou il y en a, on ajoute les <li> de groupe
		if(elt.indexOf("-") != -1) {
			var tabGroup = elt.split("-");
			group = tabGroup[0];
			if(group != previousGroup) {
				if(!isResultInGroup) {
					$("#group-" + previousGroup).remove();
				}
				
				var li = $('<li class="vui-combobox-group" id="group-' + group + '">' + vdpSimpleSource[id]['arrGroupName'][group] + '</li>')
						.appendTo(ul);
				previousGroup = group;
				isResultInGroup = false;
			}
		}

		var labelLi = source[elt];
		if(vdpSimpleSource[id]['additionalInformation'] != null && vdpSimpleSource[id]['additionalInformation'] != undefined 
				&& vdpSimpleSource[id]['additionalInformation'][elt] != null && vdpSimpleSource[id]['additionalInformation'][elt] != undefined  && vdpSimpleSource[id]['additionalInformation'][elt] != "") {
			labelLi += vdpSimpleSource[id]['additionalInformation'][elt];
		}
		
		// On filtre les r�sultats selon ce qui est tap� dans la textbox		
		if(showAllValues || vdpCommonSelectSearchEachWordInValue( labelLi, inputLabel ) ) {
			var ariaSelectedClass = "";
			if(!showAllValues && isFirstValue) {
				isFirstValue = false;
				ariaSelectedClass = " ariaSelected";
			}
			
			var onmouseover = 'vdpSimpleSelectLiHover(\'item-' + id + '-' + elt + '\',\'' + id + '\');';
			var onmouseout = 'vdpCommonsSelectLiUnhover(\'item-' + id + '-' + elt + '\');';
			var liTitle = "";
			if(vdpSimpleSource[id]['tooltips'] != undefined && vdpSimpleSource[id]['tooltips'][elt] != undefined && vdpSimpleSource[id]['tooltips'][elt]["mouseout"] != undefined )
			{
				onmouseover = vdpSimpleSource[id]['tooltips'][elt]['mouseover'] + onmouseover;
				onmouseout = vdpSimpleSource[id]['tooltips'][elt]['mouseout'] + onmouseout;
			}
			else {
				liTitle = 'title="' + source[elt] + '"';
			}
			
			var li = $('<li class="vui-combobox-item' + ariaSelectedClass + '"  ' + liTitle + ' onmouseover="' + onmouseover + '" onmouseout="' + onmouseout + '" id="item-' + id + '-' + elt + '" onclick="vdpSimpleSelectSelectValueLi(\'' + id + '\', \'' + elt + '\', true, true);" role="option" role="listitem" tabindex="-1">' + vdpCommonSelectStrongValue(labelLi, inputLabel, !showAllValues) + '</li>');
			li.appendTo(ul);

			// Cas ou l'option est s�lectionn�e
			if(vdpSimpleSource[id]['indexSelected'] == elt) {
				li.addClass("vui-combobox-item-selected");
			}
			
			isResult = true;
			isResultInGroup = true;
			i++;
			if(i == vdpSimpleSource[id]['maxDisplayedItems']) {
				divValuesHeight = divValues.height();
			}
		}
	}
	
	if(divValuesHeight == 0)
		divValues.css("height", "auto");
	else
		divValues.css("height", divValuesHeight + "px");
	
	// On g�re le cas du dernier groupe dans le contexte ou il y a des groupes
	if(!isResultInGroup && group != -1) {
		$("#group-" + previousGroup).remove();
	}
	
	// Si on a aucun r�sultat on informe l'utilisateur
	if(!isResult) {
		if( vdocCommonsArraySize( source ) == 0 )
			$('<li class="vui-combobox-no-item">' + getStaticString( "LG_COMMON_SELECT_LIST_NO_VALUE_AVAILABLE" ) + '</li>').appendTo(ul);
		else
			$('<li class="vui-combobox-no-item">' + getStaticString( "LG_COMMON_SELECT_LIST_NO_RESULT" ) + ' <strong>' + inputLabel + '</strong></li>').appendTo(ul);
	}
	else {
		vdpCommonSelectSetFirstLastClassList(id, false);
	}

	var moreUl = divValues.find("ul#vui-combobox-more-items");
	if(!(moreUl == undefined || moreUl==null))
		moreUl.empty();
	if(vdpSimpleSource[id]['moreItems'] && isResult )
	$('<ul id="vui-combobox-more-items" class="vui-combobox-more-items"><li class="vui-combobox-no-item" id="vui-combobox-more-items">' + getStaticString( "LG_SELECTOR_LI_MORE_ITEMS" ).replace(".",".<br/>") + '</li></ul>').appendTo(divValues);

			

	
	// On le montre � la fin pour que toutes les tailles recalcul�es pendant l'affichage soient bonnes
	vdpSimpleSelectShowAutocomplete(id);
	
	// Si l'autocomplete est plac� au dessus de la textbox on recalcule le positionnement pour �viter les d�calages
	if(parseInt(input.offset().top) > parseInt(divValues.offset().top)) {
		vdpComboboxCalculateAutoCompletePosition( vdpSimpleSource[id]['selectorVuiComboBox'], divValues );
	}
}

function vdpSimpleSelectFocus(id) {
	vdpCommonSelectCloseOtherCombo( id, false );
	if(vdpSimpleSource[id] != undefined && vdpSimpleSource[id] != null && vdpSimpleSource[id]["isAjax"] && !vdpSimpleSource[id]['open'] && !vdpSimpleSource[id]['displaySelectionOutside'] && vdpSimpleSource[id]['indexSelected'] != null 
			&& vdpSimpleSource[id]['indexSelected'] != "" && vdpSimpleSource[id]['source'][vdpSimpleSource[id]['indexSelected']] != "") {
		vdpSimpleSource[id]["triggerMouseUp"] = true;
		vdpSimpleSource[id]["selectorInputAC"].select();
	}
}

function vdpSimpleSelectOnOnMouseUp(id, event) {
	if(vdpSimpleSource[id]["triggerMouseUp"])
	{
		vdpSimpleSource[id]["triggerMouseUp"] = false;
		vdpPreventDefault( event );
	}
}

function vdpSimpleSelectOnBlur(id) {
	if(vdpSimpleSource[id] != undefined && vdpSimpleSource[id] != null && (vdpSimpleSource[id]["selectorInputAC"].val() == "" || vdpSimpleSource[id]["selectorInputAC"].val() == null)) {
		vdpSimpleSource[id]['selectorVuiComboBox'].removeClass("vui-combobox-change");
	}
	
	// On replace la valeur pr�c�dente dans le cas ajax, car dans le cas d'une autocomplete ceci est fait dans le hideAutocomplete
	if(vdpSimpleSource[id] != undefined && vdpSimpleSource[id] != null && vdpSimpleSource[id]["isAjax"] && !vdpSimpleSource[id]['open'] && !vdpSimpleSource[id]['displaySelectionOutside'] && vdpSimpleSource[id]['indexSelected'] != null 
			&& vdpSimpleSource[id]['indexSelected'] != "" && vdpSimpleSource[id]['source'][vdpSimpleSource[id]['indexSelected']] != "") {
		vdpSimpleSource[id]["selectorInputAC"].val(vdpSimpleSource[id]['source'][vdpSimpleSource[id]['indexSelected']]);
		vdpSimpleSource[id]['selectorVuiComboBox'].removeClass("vui-combobox-change");
	}
}

function vdpSimpleSelectSelectValueLi(id, index, throwEvents, hideAutoComplete) {
	// Action de click sur le li de l'autocomplete pour s�lectionner une valeur, dans ce cas uniquement on remet � 0 la valeur recherch�e
	vdpSimpleSource[id]['lastSearch'] = "";
	vdpSimpleSelectSelectValue( id, index, throwEvents, hideAutoComplete );
}

function vdpSimpleSelectSelectValue(id, index, throwEvents, hideAutoComplete) {
	vdpSimpleSource[id]['selectorInputAC'].focus();
	vdpSimpleSource[id]['selectorVuiComboBox'].removeClass("vui-combobox-change");
	vdpSimpleSource[id]['selectorInputAC'].val("");
	vdpSimpleSource[id]["selectorInputAC"].blur();
	vdpSimpleSource[id]['indexSelected'] = index;

	if(vdpSimpleSource[id]['isDocumentChangedScript'] && vdpSimpleSource[id]['documentChangedScript'] != "") {
		eval(vdpSimpleSource[id]['documentChangedScript']);
	}

	if(vdpSimpleSource[id]['displaySelectionOutside']) {
		vdpSimpleSource[id]['selectorSpanSelected'].empty();
		if(vdpSimpleSource[id]['resetType'] == 0) {
			vdpSimpleSource[id]['selectorSpanSelected'].append(vdpSimpleSource[id]['selectorImgDelete']);
		}
		
		vdpSimpleSource[id]['selectorSpanSelected'].append(vdpSimpleSource[id]['source'][index]);
		
		if(vdpSimpleSource[id]['isAjax'])
		{
			vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseover", "");
			vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseout", "");
			if(vdpSimpleSource[id]['tooltips'] != null && vdpSimpleSource[id]['tooltips'][index] != null && vdpSimpleSource[id]['tooltips'][index]['mouseover'] != null && vdpSimpleSource[id]['tooltips'][index]['mouseover'] != "") 
			{
				vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseover", vdpSimpleSource[id]['tooltips'][index]['mouseover']);
				vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseout", vdpSimpleSource[id]['tooltips'][index]['mouseout']);
			}
		}
		else {
			vdpSimpleSource[id]['selectorSpanSelected'].attr("title", vdpSimpleSource[id]['source'][index]);
		}
		
		vdpSimpleSource[id]['selectorSpanSelected'].show();
		vdpSimpleSource[id]['selectorOut'].show();
	}
	else {
		if(vdpSimpleSource[id]['resetType'] == 0) {
			vdpSimpleSource[id]["selectorImgDelete"].show();
			if(vdpSimpleSource[id]['isAutoComponentSize']) {
				var width = vdpSimpleSource[id]['widthInput'];
				vdpSimpleSource[id]["selectorInputAC"].css("width", width + "px");
			}
			else {
				vdpSimpleSource[id]["selectorInputAC"].addClass("vui-combobox-offset");	
			}			
		}
		vdpSimpleSource[id]["selectorInputAC"].val(vdpSimpleSource[id]['source'][index]);
		if(vdpSimpleSource[id]['isAjax'])
		{
			vdpSimpleSource[id]['selectorInputAC'].attr("onmouseover", "");
			vdpSimpleSource[id]['selectorInputAC'].attr("onmouseout", "");
			if(vdpSimpleSource[id]['tooltips'] != null && vdpSimpleSource[id]['tooltips'][index] != null && vdpSimpleSource[id]['tooltips'][index]['mouseover'] != null && vdpSimpleSource[id]['tooltips'][index]['mouseover'] != "") 
			{
				vdpSimpleSource[id]['selectorInputAC'].attr("onmouseover", vdpSimpleSource[id]['tooltips'][index]['mouseover']);
				vdpSimpleSource[id]['selectorInputAC'].attr("onmouseout", vdpSimpleSource[id]['tooltips'][index]['mouseout']);
			}
		}
		else {
			vdpSimpleSource[id]['selectorInputAC'].attr("title", vdpSimpleSource[id]['source'][index]);
		}
	}
	
	if(vdpSimpleSource[id]['isAjax'])
		vdpHideTooltip();
	
	if(hideAutoComplete) {
		vdpSimpleSelectHideAutocomplete(id, false); // Cette deuxi�me fonction ne lance pas de throwEvents pour ne pas en lancer deux successifs
	}
	
	vdpResizeIFrame();
	
	if(vdpSimpleSelectHandleHiddenInput(id, index, throwEvents)) {
		return;
	}
}

function vdpSimpleSelectShowAutocomplete(id) {
	vdpCommonSelectCloseOtherCombo( id, false );
	if(!vdpSimpleSource[id]['open']) {
		vdpCommonsAutocompleteIsOpen = true;
		var divItems = vdpCommonSelectGetDivItems(false, id);
		
		if(vdpSimpleSource[id]['widthDivItems'] != null) {
			divItems.css("min-width", vdpSimpleSource[id]['widthDivItems'] + "px");
		}
		else {
			divItems.css("min-width", "");
		}
		
		if(lightBoxVisible)
			divItems.css("z-index", zindexVDPComboLigthbox);
		else
			divItems.css("z-index", zindexVDPCombo);

		vdpComboboxCalculateAutoCompletePosition( vdpSimpleSource[id]['selectorVuiComboBox'], divItems );
		divItems.show();
		vdpSimpleSource[id]['open'] = true;
		vdpSimpleSelectBindKeyDownEvent( id );
	}
}

function vdpComboboxCalculateAutoCompletePosition(selectorParent, selectorDivItems) {
	// Position du combo parent
	var parentLeft = selectorParent.offset().left;
	var parentTop = selectorParent.offset().top;
	var parentOutterHeight = selectorParent.outerHeight(false);
	var parentWidth = selectorParent.width();
	
	var divItemsHeight = selectorDivItems.height();
	var divItemsWidth = selectorDivItems.width();
	
	// Info sur la fen�tre
	var windowScrollTop = $(window).scrollTop();
	var windowScrollLeft = $(window).scrollLeft();
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	// Cas classique cal� en bas
	var newTop = parentTop + parentOutterHeight;// - windowScrollTop;
	
	var forceDivItemsHeight = null;
	// Si ca ne rentre pas en bas on place en haut si ca rentre
	if((parentTop + parentOutterHeight + divItemsHeight) > (windowScrollTop + windowHeight) ) {
		// si ca rentre en haut on le calle en haut
		if( (parentTop - divItemsHeight) > (windowScrollTop)) {
			newTop = parentTop - divItemsHeight;// - windowScrollTop;
		}
		else {
			// Si ca ne rentre nul part on r�duit la taille de la fen�tre pour qu'on puisse scroller dedans
			forceDivItemsHeight = (windowScrollTop + windowHeight) - (parentTop + parentOutterHeight );
		}
	}
	
	// Cas classique de la combo plac�e � gauche
	var newLeft = parentLeft; // - windowScrollLeft;
	
	// Sinon � droite
	if((parentLeft + divItemsWidth) > (windowScrollLeft + windowWidth)){
		newLeft = parentLeft + parentWidth - divItemsWidth;
	}
	
	if(forceDivItemsHeight == null) {
		selectorDivItems.css({ "top" : newTop + "px" , "left": newLeft + "px" });
	}
	else {
		selectorDivItems.css({ "top" : newTop + "px" , "left": newLeft + "px", "height" : forceDivItemsHeight + "px" });
	}
}

function vdpSimpleSelectHideAutocomplete(id, throwEvent) {
	if(vdpSimpleSource[id]['open']) {
		vdpCommonsAutocompleteIsOpen = false;
		var divItems = vdpCommonSelectGetDivItems(false, id);
		// vdpSelectCommonCurrentComboId = null;
		if(lightBoxVisible)
			divItems.css("z-index", zindexVDPComboLigthbox - 10);
		else
			divItems.css("z-index", zindexVDPCombo - 10);
		vdpSimpleSource[id]["selectorInputAC"].val("");
		vdpSimpleSource[id]['selectorVuiComboBox'].removeClass("vui-combobox-change");
		divItems.hide();
		vdpSimpleSelectShowSelectedValue(id);
		vdpSimpleSource[id]['open'] = false;
		vdpSimpleSelectUnbindKeyDownEvent(id);
	}
}

function vdpSimpleSelectHideAutocompleteForSimpleSelector(id) {
	vdpCommonSelectGetDivItems( false, id ).hide();
	vdpSimpleSource[id]['open'] = false;
	vdpSimpleSelectUnbindKeyDownEvent(id);
}

function vdpSimpleSelectShowSelectedValue(id) {
	var selectedIndex = vdpSimpleSource[id]['indexSelected'];
	if(selectedIndex != "") {
		vdpSimpleSelectSelectValue( id, selectedIndex, false, false ); // Pas de throwEvent ici on remet la valeur pr�c�dente
	}
}

function vdpSimpleSelectUnselectValue(event, id) {
	stopPropagation(event);
	vdpSimpleSource[id]['selectorVuiComboBox'].removeClass("vui-combobox-change");
	if(vdpSimpleSource[id]['resetType'] == 0) {
		if(vdpSimpleSelectHandleHiddenInput(id, "", true)) {
			return;
		}
		
		vdpCommonSelectRollover( false, vdpSimpleSource[id]["selectorImgDelete"] );
		if(vdpSimpleSource[id]['displaySelectionOutside']) {
			vdpSimpleSource[id]['selectorSpanSelected'].empty();
			if(vdpSimpleSource[id]['isAjax']) {
				vdpHideTooltip();
				vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseout", "");
				vdpSimpleSource[id]['selectorSpanSelected'].attr("onmouseover", "");
			}
			else {
				vdpSimpleSource[id]['selectorSpanSelected'].attr("title", "");
			}
			vdpSimpleSource[id]['selectorOut'].hide();
			vdpSimpleSource[id]['selectorSpanSelected'].hide();
		}
		else {
			vdpSimpleSource[id]["selectorImgDelete"].hide();
			if(vdpSimpleSource[id]['isAutoComponentSize']) {
				var width = vdpSimpleSource[id]['widthInput'] + vdpSimpleSource[id]['widthDelete'];
				vdpSimpleSource[id]["selectorInputAC"].css("width", width + "px");
			}
			else {
				vdpSimpleSource[id]["selectorInputAC"].removeClass("vui-combobox-offset");	
			}
			
			if(vdpSimpleSource[id]['isAjax']) {
				vdpHideTooltip();
				vdpSimpleSource[id]['selectorInputAC'].attr("onmouseout", "");
				vdpSimpleSource[id]['selectorInputAC'].attr("onmouseover", "");
			}
			else {
				vdpSimpleSource[id]['selectorInputAC'].attr("title", "");
			}
		}
		vdpSimpleSource[id]['indexSelected'] = "";
		vdpSimpleSource[id]["selectorInputAC"].val("");
		
		if(vdpSimpleSource[id]['isDocumentChangedScript'] && vdpSimpleSource[id]['documentChangedScript'] != "") {
			eval(vdpSimpleSource[id]['documentChangedScript']);
		}
	}
	vdpResizeIFrame();
}

function vdpSimpleSelectClickOpener(id, event) {
	stopPropagation(event);
	if(vdpSimpleSource[id]['isAjax']) {
		vdpSimpleSelectHideAutocomplete(id, false);
		// Si on affiche la valeur s�lectionn�e � l'int�rieur du champ on r�injecte la derni�re recherche dans le textbox pour ne pas filtrer dans le s�lecteur avanc�
		vdpSimpleSource[id]["selectorInputAC"].val(vdpSimpleSource[id]["lastSearch"]);
		eval(vdpSimpleSource[id]['urlOpenSelector']);
	}
	else {
		if(vdpSimpleSource[id]['open']) {
			vdpSimpleSelectHideAutocomplete(id, false);
		}
		else {
			vdpSimpleSelectKeyUp( id, true, event );
			var input = vdpSimpleSource[id]["selectorInputAC"];
			if(input.length > 0 && input.val().length == 0 )
				input.focus();
			
		}
	}
}

function vdpSimpleSelectHandleHiddenInput(id, value, throwEvent) {
	var valueWithGroup = value;
	// Dans le cas d'un groupe on supprime l'index du groupe dans l'input hidden 
	if(value != undefined && value != null && value != "" && value.indexOf("-") != -1) {
		arrValue = value.split('-');
		value = arrValue[1];
	}
	
	vdpSimpleSource[id]['selectorHidden'].val(value);
	vdpSimpleSource[id]['indexSelected'] = valueWithGroup;

	if(throwEvent && vdpSimpleSource[id]['throwEventsCallback'] != undefined && vdpSimpleSource[id]['throwEventsCallback'] != null && vdpSimpleSource[id]['throwEventsCallback'].length > 0) {
		vdpSelectCommonThrowEventsContext = true;
		eval(vdpSimpleSource[id]['throwEventsCallback']);
		return true;
	}
	return false;
}

//*****************************************************************************
//
//End - Combobox simple
//
//*****************************************************************************

//*****************************************************************************
//
//Start - Combobox multiples
//
//*****************************************************************************
function vdpMultipleSelectLiHover(idLi, id) {
	vdpMultipleSource[id]['selectorInput'].blur();
	var list = vdpCommonSelectGetDivItems( true, vdpSelectCommonCurrentComboId );
	var options = list.find("ul").find('li.vui-combobox-item');
	
	var curOption = options.filter('.ariaSelected'); 
	
	// On supprime le hover pr�c�dent si il existe
	if(curOption.length > 0) {
		curOption.removeClass("ariaSelected");
	}
	// On ajoute le hover sur l'objet courant
	$("#" + idLi ).addClass("ariaSelected");
}

var vdpMultipleSelectDoKeyDown = function(event) {
	var id = vdpSelectCommonCurrentComboId;
	switch(event.keyCode) {
		case 27: // echap
			stopPropagation( event );
			vdpPreventDefault( event );
			vdpMultipleSource[id]['selectorInput'].focus();
			vdpMultipleSelectHideAutocomplete( id, true, true );
		break;
		case 9: // tab
			vdpMultipleSource[id]['selectorInput'].focus();
			vdpMultipleSelectHideAutocomplete(id, true, true);
		break;
		case 13: // entr�e
			if(vdpMultipleSource[id]['isAjax']) {
				stopPropagation( event );
				vdpPreventDefault( event );	
				var list = vdpCommonSelectGetDivItems( true, id );
				options = list.find('li.vui-combobox-item');
				
				var curOption = options.filter('.ariaSelected');
				var idLi = curOption.attr("id");
				if(idLi != undefined && idLi != null) {
					if(idLi == "vui-combobox-browse") {
						vdpCommonSelectOnClickLiBrowse(id, true, event);
					}
				}
			}
			break;
		case 32: // espace
			if($('input#' + id + ':focus').length == 0) {
				stopPropagation( event );
				vdpPreventDefault( event );	
				var list = vdpCommonSelectGetDivItems( true, id );
				options = list.find('li.vui-combobox-item');
				
				var curOption = options.filter('.ariaSelected');
				var idLi = curOption.attr("id");
				if(idLi != undefined && idLi != null && idLi != "vui-combobox-browse") {
					if(idLi == "liCheckAllItems") {
						vdpMultipleSelectSelectionnerTout(id, event);
					}
					else {
						var eltIndex = idLi.replace("item-" + id + "-", "");
						vdpMultipleSelectSelectValue( id , eltIndex, true);	
					}
				}
			}
		break;
		case 38: // fl�che haut
			stopPropagation( event );
			vdpPreventDefault( event );	
			vdpMultipleSource[id]['selectorInput'].blur();
			var list = vdpCommonSelectGetDivItems( true, id );
			options = list.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected'); 
			var curNdx = options.index(curOption);
			
			if(curNdx == -1) {
				curOption = options.filter('.selected');
				curNdx = options.index(curOption); 
			}
			
			if (curNdx > 0) {
				var prev = options.eq(curNdx - 1); 

				if (vdpMultipleSource[id]['open'] == true) {
					curOption.removeClass('ariaSelected');
					prev.addClass('ariaSelected');
					list.scrollTop(calcOffset(list, options, prev)); 
				}
			}
			else {
				curOption.removeClass('ariaSelected');
				vdpMultipleSource[id]['selectorInput'].focus();
			}
		break;
		case 40: // fl�che bas
			stopPropagation( event );
			vdpPreventDefault( event );	
			vdpMultipleSource[id]['selectorInput'].blur();
			var list = vdpCommonSelectGetDivItems( true, id );
			options = list.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			var curNdx = options.index(curOption); 

			if(curNdx == -1) {
				curOption = options.filter('.selected');
				curNdx = options.index(curOption); 
			}
				
			
			if (curNdx < options.length - 1) {
				var next = options.eq(curNdx + 1); 

				if (vdpMultipleSource[id]['open'] == true) {
					curOption.removeClass('ariaSelected');
					next.addClass('ariaSelected');
					list.scrollTop(calcOffset(list, options, next)); 
				}
			}
		break;
		case 33: // page up
			stopPropagation( event );
			vdpPreventDefault( event );	
			vdpMultipleSource[id]['selectorInput'].blur();
			var list = vdpCommonSelectGetDivItems( true, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			curOption.removeClass('ariaSelected');
			
			var firstOption = options.filter('.first');
			firstOption.addClass('ariaSelected');
			list.scrollTop(calcOffset(list, options, firstOption));
		break;
		case 34: // page down
			stopPropagation( event );
			vdpPreventDefault( event );	
			vdpMultipleSource[id]['selectorInput'].blur();
			var list = vdpCommonSelectGetDivItems( true, id );
			var ul = list.find("ul");
			options = ul.find('li.vui-combobox-item');
			
			var curOption = options.filter('.ariaSelected');
			curOption.removeClass('ariaSelected');
			
			var lastOption = options.filter('.last');
			lastOption.addClass('ariaSelected');
			list.scrollTop(calcOffset(list, options, lastOption));
		break;
	}
}

function vdpMultipleSelectBindKeyDownEvent(id) {
	registerOnKey(vdpMultipleSelectDoKeyDown);
}

function vdpMultipleSelectUnbindKeyDownEvent(id) {
	unregisterOnKey(vdpMultipleSelectDoKeyDown);
}

function vdpMultipleSelect(idInput, idHidden, source, maxDisplayedElement, componentSize, selectedValue, arrGroupName, pathImgTransparent, isAjax, urlCallAjax, timeBeforeFireRequest, lengthBeforeFireRequest, urlOpenSelector, isViewOpen, maxDisplayedItems, formId, navigatorId, scrollableId, throwEventsCallback, cssClass, isDocumentChangedScript, documentChangedScript, isDisplayedAllSelectedItems, idHiddenIsDisplayedAllSelectedItems, isPortalContext, javascriptArrayTooltip, isVisibleOpener) {
	vdpMultipleSource[idInput] = new Array();
	vdpSelectCommonThrowEventsContext = false;
	vdpMultipleSource[idInput]['formId'] = formId;
	vdpMultipleSource[idInput]['source'] = source;
	vdpMultipleSource[idInput]['open'] = false;
	vdpMultipleSource[idInput]['maxElt'] = maxDisplayedElement;
	vdpMultipleSource[idInput]['idHidden'] = idHidden;
	vdpMultipleSource[idInput]['isShowAll'] = false;
	vdpMultipleSource[idInput]['pathImgTransparent'] = pathImgTransparent;

	vdpMultipleSource[idInput]['isAjax'] = false;
	vdpMultipleSource[idInput]['isVisibleOpener'] = true;
	vdpMultipleSource[idInput]['isPortalContext'] = isPortalContext;
	
	if(selectedValue != null)
		vdpMultipleSource[idInput]['selectedValue'] = selectedValue;
	else
		vdpMultipleSource[idInput]['selectedValue'] = new Array();
	
	// Si on est en mode ajax on ajoute les param�tres requis pour aller chercher dans le selecteur
	if(isAjax) {
		vdpMultipleSource[idInput]['isAjax'] = isAjax;
		vdpMultipleSource[idInput]['urlCallAjax'] = urlCallAjax;
		vdpMultipleSource[idInput]['urlOpenSelector'] = urlOpenSelector;
		vdpMultipleSource[idInput]['timeBeforeFireRequest'] = timeBeforeFireRequest;
		vdpMultipleSource[idInput]['lengthBeforeFireRequest'] = lengthBeforeFireRequest;
		vdpMultipleSource[idInput]['lastSearch'] = "";
		vdpMultipleSource[idInput]['isViewOpen'] = isViewOpen;
		vdpMultipleSource[idInput]['tooltips'] = javascriptArrayTooltip;
		vdpMultipleSource[idInput]['isVisibleOpener'] = isVisibleOpener;
	}
	
	vdpMultipleSource[idInput]['maxDisplayedItems'] = maxDisplayedItems;
	vdpMultipleSource[idInput]['selectorHidden'] = $("#" + idHidden);
	vdpMultipleSource[idInput]['selectorVuiCombobox'] = $("#vui-combobox-" + idInput );
	vdpMultipleSource[idInput]['selectorInput'] = $("#" + idInput);
	vdpMultipleSource[idInput]['selectorSelectedItems'] = $("#vui-combobox-" + idInput + "-selected-items");
	vdpMultipleSource[idInput]['navigatorId'] = navigatorId;
	vdpMultipleSource[idInput]['scrollableId'] = scrollableId;
	vdpMultipleSource[idInput]['throwEventsCallback'] = throwEventsCallback;
	vdpMultipleSource[idInput]['cssClass'] = cssClass;
	vdpMultipleSource[idInput]['values'] = "";
	vdpMultipleSource[idInput]['selectorHiddenIsDisplayedAllSelectedItems'] = $("#" + idHiddenIsDisplayedAllSelectedItems);
	
	if(arrGroupName != null) {
			vdpMultipleSource[idInput]['arrGroupName'] = arrGroupName;
	}
	
	var divSelectedItem = vdpMultipleSource[idInput]['selectorSelectedItems'];
	vdpMultipleSelectGetPlus(idInput).hide();
	vdpMultipleSelectGetMinus(idInput).hide();
	vdpMultipleSelectGetActionPanel(idInput).hide();
	
	vdpMultipleSelectRecalculteSelectedItemDiv(idInput);

	// Gestion des valeurs s�lectionn�es
	if(selectedValue != null) {
		for(selectedElt in selectedValue) {
			vdpMultipleSource[idInput]['values'] += selectedValue[selectedElt] + ",";
		}
		if(vdpMultipleSource[idInput]['values'] != null && vdpMultipleSource[idInput]['values'].length > 0) {
			vdpMultipleSource[idInput]['values'] = vdpMultipleSource[idInput]['values'].substring(0,vdpMultipleSource[idInput]['values'].length - 1);
		}
	}

	var widthOpener = 25;
	//On calcul la largeur en fonction du contenu de la combo
	if(componentSize == 4) {
		var widthUl = vdpCommonSelectGetAutoWidth( vdpMultipleSource[idInput], idInput, true );
		
		vdpMultipleSource[idInput]['widthInput'] = widthUl;		
		vdpMultipleSource[idInput]['widthDivItems'] = widthUl +  widthOpener;
		
		vdpMultipleSource[idInput]['selectorInput'].css("width", vdpMultipleSource[idInput]['widthInput'] + "px");
	}
	else {
		// on est en largeur fix�e
		var widthUl = vdpMultipleSource[idInput]['selectorInput'].width();
		
		vdpMultipleSource[idInput]['widthInput'] = widthUl;		
		vdpMultipleSource[idInput]['widthDivItems'] = widthUl +  widthOpener;
	}
	

	if(isAjax && isViewOpen) {
		vdpMultipleSelectGetMinus(idInput).show();
	}
	vdpCommonSelectGetDivItems( true, idInput ).hide();
	
	vdpMultipleSource[idInput]['open'] = false;

	// On le fait � la fin pour ne pas le d�clencher pendant l'init des valeurs s�lectionn�es
	vdpMultipleSource[idInput]['isDocumentChangedScript'] = isDocumentChangedScript;
	if(isDocumentChangedScript) {
		vdpMultipleSource[idInput]['documentChangedScript'] = documentChangedScript;
	}
	else {
		vdpMultipleSource[idInput]['documentChangedScript'] = "";
	}

	if(isDisplayedAllSelectedItems) {
		vdpMultipleSelectButtonPlus( idInput );
	}
}

function vdpMultipleSelectGetPlus(id) {
	return vdpMultipleSource[id]['selectorSelectedItems'].find("span#vui-combobox-multi-plus-" + id);
}

function vdpMultipleSelectGetMinus(id) {
	return vdpMultipleSource[id]['selectorSelectedItems'].find("span#vui-combobox-multi-minus-" + id);
}

function vdpMultipleSelectGetActionPanel(id) {
	return $("#vui-combobox-" + id + "-actions");
}

function vdpMultipleSelectFocus(id) {
	vdpCommonSelectCloseOtherCombo( id, true );
	if(vdpMultipleSource[id]["isAjax"] && !vdpMultipleSource[id]['open']) {
		vdpMultipleSource[id]["triggerMouseUp"] = true;
		vdpMultipleSource[id]["selectorInput"].select();
	}
}

function vdpMultipleSelectOnOnMouseUp(id, event) {
	if(vdpMultipleSource[id]["triggerMouseUp"])
	{
		vdpMultipleSource[id]["triggerMouseUp"] = false;
		vdpPreventDefault( event );
	}
}

function vdpMultipleSelectKeyUpSelector( id, event ) {
	if(event != null && (event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13)) {
		// Surcharge du tab pour ne pas ouvrir l'autocompletion
		return;
	}
	
	vdpCommonSelectCloseOtherCombo(id, true);
	vdpCommonsMultipleSelectorCallAjaxValues( id );
}

function vdpMultipleSelectKeyUp(id, isShowAll, event) {
	if(event != null && (event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13)) {
		// Surcharge du tab pour ne pas ouvrir l'autocompletion
		return;
	}
	
	vdpCommonSelectCloseOtherCombo(id, true);
	var input = vdpMultipleSource[id]['selectorInput'];	
	var divValues = vdpCommonSelectGetDivItems( true, id );
	divValues.css("height", "auto");
	divValues.find("ul#vui-combobox-menu").show();
	var ul = divValues.find("ul#vui-combobox-value");
	ul.empty();
	var isResult = false;	
	
	source = vdpMultipleSource[id]['source'];
	
	var group = -1;
	var previousGroup = -1;
	var isResultInGroup = false;
	var inputLabel = input.val();
	var i = 0;
	var lengthSelectedValues = 0;
	var divValuesHeight = 0;
	for(elt in source) {
		// Gestion des groupes dans le cas ou il y en a, on ajoute les <li> de groupe
		if(elt.indexOf("-") != -1) {
			var tabGroup = elt.split("-");
			group = tabGroup[0];
			if(group != previousGroup) {
				if(!isResultInGroup) {
					ul.find("#group-" + previousGroup).remove();
				}
				
				var rolloverPortalScript = "";
				if(vdpMultipleSource[id]['isPortalContext']) {
					rolloverPortalScript = 'onmouseover="vdpCommonSelectRollover(true, this);" onmouseout="vdpCommonSelectRollover(false, this);"';
				}
				var li = $('<li class="vui-combobox-group" ' + rolloverPortalScript + ' id="group-' + group + '">' + vdpMultipleSource[id]['arrGroupName'][group] + '</li>')
						.appendTo(ul);
				previousGroup = group;
				isResultInGroup = false;
			}
		}
		
		var labelLi = source[elt];
		if(vdpMultipleSource[id]['additionalInformation'] != null && vdpMultipleSource[id]['additionalInformation'] != undefined 
				&& vdpMultipleSource[id]['additionalInformation'][elt] != null && vdpMultipleSource[id]['additionalInformation'][elt] != undefined  && vdpMultipleSource[id]['additionalInformation'][elt] != "") {
			labelLi += vdpMultipleSource[id]['additionalInformation'][elt];
		}
		
		// On filtre les r�sultats selon ce qui est tap� dans la textbox
		if(isShowAll || vdpCommonSelectSearchEachWordInValue( labelLi, inputLabel ) ) {
			var onmouseover = "";
			var onmouseout = "";
			var liTitle = "";
			if(vdpMultipleSource[id]['isAjax'] && vdpMultipleSource[id]['tooltips'] != undefined && vdpMultipleSource[id]['tooltips'][elt] != undefined && vdpMultipleSource[id]['tooltips'][elt]["mouseout"] != undefined )
			{
				onmouseover = vdpMultipleSource[id]['tooltips'][elt]['mouseover'];
				onmouseout = vdpMultipleSource[id]['tooltips'][elt]['mouseout'];
			}
			else {
				liTitle = 'title="' + labelLi + '"';
			}
				
			var li = $('<li class="vui-combobox-item" onmouseover="' + onmouseover + 'vdpMultipleSelectLiHover(\'item-' + id + '-' + elt + '\', \'' + id + '\');" onmouseout="' + onmouseout + 'vdpCommonsSelectLiUnhover(\'item-' + id + '-' + elt + '\');" ' + liTitle + ' id="item-' + id + '-' + elt + '" onclick="vdpMultipleSelectSelectValue(\'' + id + '\', \'' + elt + '\', true);stopPropagation(event);"><label onclick="stopPropagation(event);"><input type="checkbox" class="checkbox" onclick="vdpMultipleSelectSelectValue(\'' + id + '\', \'' + elt + '\', false);stopPropagation(event);" />' + vdpCommonSelectStrongValue(labelLi, inputLabel, !isShowAll) + '</label></li>')
						.appendTo(ul);
			
			// Cas ou l'option est s�lectionn�e
			if(vdpInArray( elt, vdpMultipleSource[id]['selectedValue'])) {
				li.find('input').attr('checked', true);
				li.addClass('vui-combobox-item-selected');
				lengthSelectedValues++;
			}
			
			isResult = true;
			isResultInGroup = true;
			i++;
			if(i == vdpMultipleSource[id]['maxDisplayedItems']) {
				divValuesHeight = divValues.height();
			}
		}
	}
	
	if(divValuesHeight == 0)
		divValues.css("height", "auto");
	else
		divValues.css("height", divValuesHeight + "px");
	
	// On g�re le cas du dernier groupe dans le contexte ou il y a des groupes
	if(!isResultInGroup && group != -1) {
		ul.find("#group-" + previousGroup).remove();
	}
	
	// Si on a aucun r�sultat on informe l'utilisateur
	if(!isResult) {
		if( vdocCommonsArraySize( source ) == 0 )
		{
			$('<li class="vui-combobox-no-item">' + getStaticString( "LG_COMMON_SELECT_LIST_NO_VALUE_AVAILABLE" ) + '</li>').appendTo(ul);
			divValues.find("ul#vui-combobox-menu").hide();
		}
		else
			$('<li class="vui-combobox-no-item">' + getStaticString( "LG_COMMON_SELECT_LIST_NO_RESULT" ) + ' <strong>' + inputLabel + '</strong></li>').appendTo(ul);
	}
	else {
		vdpCommonSelectSetFirstLastClassList(id, true);
	}
	
	// Cas ou le nombre d'�l�ments s�lectionn�s (lengthSelectedValues) et le nombre total d'�lements affich�s (i) sont �gaux, on coche selectionner tout
	if(i == lengthSelectedValues) {
		$("#checkAllItems").attr('checked', true);
	}

	var moreUl = divValues.find("ul#vui-combobox-more-items");
	if(!(moreUl == undefined || moreUl==null)) 
		moreUl.empty();
	if(vdpMultipleSource[id]['moreItems'] && isResult)
	$('<ul id="vui-combobox-more-items" class="vui-combobox-more-items"><li class="vui-combobox-no-item" id="vui-combobox-more-items">' + getStaticString( "LG_SELECTOR_LI_MORE_ITEMS" ).replace(".",".<br/>") + '</li></ul>').appendTo(divValues);

	
	vdpMultipleSelectShowAutocomplete(id);
	
	// Si l'autocomplete est plac� au dessus de la textbox on recalcule le positionnement pour �viter les d�calages
	if(parseInt(input.offset().top) > parseInt(divValues.offset().top)) {
		vdpComboboxCalculateAutoCompletePosition( vdpMultipleSource[id]['selectorVuiCombobox'], divValues );
	}
}

function vdpInArray(needle, array) {
	for(index in array) {
		if(needle == array[index]) {
			return true;
		}
	}
	return false;
}

function vdpDeleteElementArray(needle, array) {
	for(index in array) {
		if(needle == array[index]) {
			delete(array[index]);
			break;
		}
	}
}

function vdpGetLengthAssociativeArray(array) {
	if(array == null || array == undefined) {
		return 0;
	}

	var i = 0;
	for(index in array) {
		i++;
	}
	
	return i;
}

/**
* @param indexValue sera simplement un nombre dans le cas d'un select sans groupe sinon sera sous forme => "groupe-0"
**/
function vdpMultipleSelectSelectValue(id, indexValue, isFromLi) {
	var li = vdpCommonSelectGetDivItems( true, id ).find('#item-' + id + '-' + indexValue);
	var checkbox = li.find('input');
	
	// Si l'on vient du click du <li> il faut cocher cocher ou d�cocher la checkbox car le click du <li> n'est pas li� � la checkbox
	if(isFromLi) {
		if(checkbox.attr('checked')) {
			checkbox.attr('checked', false);
		}
		else {
			checkbox.attr('checked', true);
		}
	}

	if(vdpMultipleSource[id]['isAjax'])
	{
		vdpMultipleSource[id]['lastSearch'] = "";
	}
	
	if(checkbox.attr('checked')) {
		vdpMultipleSource[id]['selectedValue'].push(indexValue);
		li.addClass('vui-combobox-item-selected');
		vdpMultipleSelectRecalculteSelectedItemDiv(id);
	}
	else {
		vdpDeleteElementArray( indexValue, vdpMultipleSource[id]['selectedValue'] );
		li.removeClass('vui-combobox-item-selected');
		vdpMultipleSelectRemoveSelectValue(id, indexValue, false);
	}
}

function vdpMultipleSelectRemoveSelectValue(id, indexValue, throwEvents) {
	vdpDeleteElementArray( indexValue, vdpMultipleSource[id]['selectedValue'] );
	if(vdpMultipleSource[id]['isAjax'])
		vdpHideTooltip();
	vdpMultipleSelectRecalculteSelectedItemDiv(id);
	if(throwEvents && vdpMultipleSource[id]['throwEventsCallback'] != "") {
		vdpMultipleSelectHandleThrowEvents( id );
	}
}

function vdpMultipleSelectUnselectAll(id) {
	if (confirm(getStaticString( "LG_MULTIPLE_SELECTOR_INPUT_CONFIRM_DELETE_ALL_SELECTED_ITEMS" )))
	{
		delete(vdpMultipleSource[id]['selectedValue']);
		vdpMultipleSource[id]['selectedValue'] = new Array();
		vdpMultipleSelectRecalculteSelectedItemDiv(id);
		if(vdpMultipleSource[id]['throwEventsCallback'] != "") {
			vdpMultipleSelectHandleThrowEvents( id );
		}
	}
}

function vdpMultipleSelectOnClickNbElements(id) {
	if(vdpMultipleSelectGetNbElementSelected(id) > vdpMultipleSource[id]['maxElt']) {
		if(vdpMultipleSource[id]['isShowAll']) {
			vdpMultipleSelectButtonMinus(id);
		}
		else {
			vdpMultipleSelectButtonPlus(id);
		}
	}
}

function vdpMultipleSelectRecalculteSelectedItemDiv(id) {
	var divSelectedItems = vdpMultipleSource[id]['selectorSelectedItems'];
	var selectedItemMinus = divSelectedItems.find('#vui-combobox-multi-selected-item-minus-' + id); 
	selectedItemMinus.empty();
	var selectedItemPlus = divSelectedItems.find('#vui-combobox-multi-selected-item-plus-' + id); 
	selectedItemPlus.empty();
	vdpMultipleSelectGetPlus(id).hide();
	vdpMultipleSelectGetMinus(id).hide();
	
	var i = 0;
	var selectedMinusString = '';
	var selectedPlusString = '';
	var showMinus = false;
	for(index in vdpMultipleSource[id]['selectedValue']) 
	{
		i++;
		if(vdpMultipleSource[id]['isAjax'] && i > vdpMultipleSource[id]['maxElt']) {
			if(!vdpMultipleSource[id]['isViewOpen'])
				vdpMultipleSelectGetPlus(id).show();
			i = vdpMultipleSource[id]['selectedValue'].length;
			break;
		}
		
		eltSelected = vdpMultipleSource[id]['selectedValue'][index];
		
		var rolloverPortalScript = "";
		if(vdpMultipleSource[id]['isPortalContext']) {
			rolloverPortalScript = 'onmouseover="vdpCommonSelectRollover(true, this);" onmouseout="vdpCommonSelectRollover(false, this);"';
		}
		
		var ajaxTooltip = "";
		if(vdpMultipleSource[id]['isAjax'] && vdpMultipleSource[id]['tooltips'] != null 
				&& vdpMultipleSource[id]['tooltips'][eltSelected] != null && vdpMultipleSource[id]['tooltips'][eltSelected]['mouseout'] != null )
		{
			ajaxTooltip = 'onmouseout="' + vdpMultipleSource[id]['tooltips'][eltSelected]['mouseout'] + '" onmouseover="' + vdpMultipleSource[id]['tooltips'][eltSelected]['mouseover'] + '"';
		}
		else {
			// Si on a pas de tooltip on affiche le title
			ajaxTooltip = 'title="' + vdpMultipleSource[id]['source'][eltSelected] + '"';
		}
		
		var selectValue = '<span class="vui-combobox-item" id="selected-item-' + id + '-' + eltSelected + '" ' + ajaxTooltip + '><img class="vui-delete" ' + rolloverPortalScript + '  title="' + getStaticString( 'LG_DELETE' ) + '" alt="' + getStaticString( 'LG_DELETE' ) + '" src="' + vdpMultipleSource[id]['pathImgTransparent'] + '" onclick="vdpMultipleSelectRemoveSelectValue(\'' + id + '\', \'' + eltSelected + '\', true);"/>' + vdpMultipleSource[id]['source'][eltSelected] + '</span>';

		// Si on est pas en mode ajax on ajoute les �lements dans l'ordre s�lectionn�, si les derniers �l�ments d�passent le nombre max d'�l�ments affich�s faudra cliquer sur le + pour les voirs 
			if(i > vdpMultipleSource[id]['maxElt']) {
				// Cas ou on a d�j� le nombre maximum d'�lements affich�s
				selectedMinusString += selectValue;
				showMinus = true;
			}
			else {
				selectedPlusString += selectValue;
			}
	}
	
	if(showMinus) {
		selectedItemMinus.show();
		vdpMultipleSelectGetPlus(id).show();
	}
	
	if( selectedMinusString != null && selectedMinusString != '' ) {
		$(selectedMinusString).appendTo(selectedItemMinus);
	}
	
	if( selectedPlusString != null && selectedPlusString != '' ) {
		$(selectedPlusString).appendTo(selectedItemPlus);
	}
	
	var panelAction = vdpMultipleSelectGetActionPanel(id);
	if( i > 0 && !vdpMultipleSource[id]['isViewOpen']) {
		divSelectedItems.show();
		panelAction.show();
		var liButton = panelAction.find('#vui-combobox-multi-label-selected-elts-' + id);
		var buttonText = i + " " + getStaticString( "LG_MULTIPLE_SELECT_LIST_NUMBER_CHECKED_ELEMENTS" );
		
		if(vdpMultipleSource[id]['isAjax'])
		{
			var spanNbEltsSelected = liButton.find("span");
			if(liButton.find(".button1-part1").length > 0 ) {
				spanNbEltsSelected = liButton.find(".button1-part1");
			}
			else if(liButton.find(".button2-part1").length > 0) {
				spanNbEltsSelected = liButton.find(".button2-part1");
			}
			else if(liButton.find(".button3-part1").length > 0) {
				spanNbEltsSelected = liButton.find(".button3-part1");
			}
			
			spanNbEltsSelected.empty().append( buttonText );
			
			var button = liButton.find("button");
			if(button.length > 0) {
				button.attr("title", buttonText );
			}
			else {
				var spanButton = liButton.find("span.button");
				if(spanButton.length > 0) {
					spanButton.attr("title", buttonText );
				}
			}
		}
		else {
			liButton.empty().append(buttonText);
		}
	}
	else {
		if(!vdpMultipleSource[id]['isViewOpen']) {
			divSelectedItems.hide();
		}
		panelAction.hide();
	}
	
	// G�re le input hidden du s�lecteur pour g�rer les donn�es lors des aller/retour serveur
	vdpMultipleSelectHandleHiddenInput(id);
	
	if(vdpMultipleSource[id]['isShowAll'] && vdpGetLengthAssociativeArray(vdpMultipleSource[id]['selectedValue']) > vdpMultipleSource[id]['maxElt'] )
		vdpMultipleSelectButtonPlus( id );
	
	vdpResizeIFrame();
}

function vdpMultipleSelectHandleHiddenInput(id) {
	var listSelectedIds = "";
	var value;

	for(index in vdpMultipleSource[id]['selectedValue']) {
		eltSelected = vdpMultipleSource[id]['selectedValue'][index];
		if(eltSelected != null && eltSelected != "" && eltSelected.indexOf("-") != -1) {
			arrValue = eltSelected.split('-');
			value = arrValue[1];
		}
		else {
			value = eltSelected;
		}
		listSelectedIds += value + ",";
	}
	listSelectedIds = listSelectedIds.substring(0,listSelectedIds.length - 1); // On supprime la virgule en trop
	var  idHidden = vdpMultipleSource[id]['idHidden'];
	vdpMultipleSource[id]['selectorHidden'].val(listSelectedIds);
	
	if(vdpMultipleSource[id]['isDocumentChangedScript'] && vdpMultipleSource[id]['documentChangedScript'] != "") {
		eval(vdpMultipleSource[id]['documentChangedScript']);
	}
}

function vdpMultipleSelectShowAutocomplete(id) {	
	vdpCommonSelectCloseOtherCombo( id, true );
	if(!vdpMultipleSource[id]['open']) {
		vdpCommonsAutocompleteIsOpen = true;
		var conteneurCombo = vdpMultipleSource[id]['selectorVuiCombobox'];
		var divItems = vdpCommonSelectGetDivItems( true, id );
		
		if(lightBoxVisible) {
			conteneurCombo.css("z-index", zindexVDPComboLigthbox);
			divItems.css("z-index", zindexVDPComboLigthbox);
		}
		else {
			conteneurCombo.css("z-index", zindexVDPCombo);
			divItems.css("z-index", zindexVDPCombo);
		}
		
		vdpComboboxCalculateAutoCompletePosition( vdpMultipleSource[id]['selectorVuiCombobox'], divItems );
		
		if(vdpMultipleSource[id]['widthDivItems'] != null) {
			divItems.css("min-width", vdpMultipleSource[id]['widthDivItems'] + "px");
		}
		else {
			divItems.css("min-width", "");
		}

		divItems.show();
		vdpMultipleSource[id]['open'] = true;
		vdpMultipleSelectBindKeyDownEvent( id );
		// On sauvegarde les valeurs selectionn�es pour d�clencher le throwevents lorsque l'on ferme le div des items
		vdpMultipleSource[id]['values'] = vdpMultipleSource[id]['selectorHidden'].val();
	}
}


function vdpMultipleSelectHideAutocomplete(id, throwEvents, clearInputValue) {
	if(vdpMultipleSource[id]['open']) {
		vdpCommonsAutocompleteIsOpen = false;
		var selectorVuiCombobox = vdpMultipleSource[id]['selectorVuiCombobox'];
		var divItems = vdpCommonSelectGetDivItems( true, id );
		if(lightBoxVisible) {
			selectorVuiCombobox.css("z-index", zindexVDPComboLigthbox - 10);
			divItems.css("z-index", zindexVDPComboLigthbox - 10);
		}
		else {
			selectorVuiCombobox.css("z-index", zindexVDPCombo - 10);
			divItems.css("z-index", zindexVDPCombo - 10);
		}
		
		if( clearInputValue )
			vdpMultipleSource[id]['selectorInput'].val("");
		
		divItems.hide();
		divItems.find("input#checkAllItems").attr('checked', false);
		vdpMultipleSource[id]['open'] = false;
		vdpMultipleSelectUnbindKeyDownEvent( id );
		
		// Gestion des throwEvents sur les combos multiples
		if(throwEvents && vdpMultipleSource[id]['throwEventsCallback'] != "") {
			vdpMultipleSelectHandleThrowEvents( id );
		}
	}
}

function vdpMultipleSelectHandleThrowEvents(id) {
	var arrayOldValues = vdpMultipleSource[id]['values'].split(',');
	var arrayNewValues = vdpMultipleSource[id]['selectorHidden'].val().split(',');
	if(arrayOldValues.length != arrayNewValues.length) {
		vdpFormInterceptFireMessage( vdpMultipleSource[id]['formId'], true );
		eval(vdpMultipleSource[id]['throwEventsCallback']);
		return;
	}
	for(index in arrayOldValues) {
		if(!vdpInArray( arrayOldValues[index], arrayNewValues )) {
			vdpSelectCommonThrowEventsContext = true;
			vdpFormInterceptFireMessage( vdpMultipleSource[id]['formId'], true );
			eval(vdpMultipleSource[id]['throwEventsCallback']);
			return;
		}
	}
}


function vdpMultipleSelectClickOpener(id, event) {
	stopPropagation(event);
	
	if(vdpMultipleSource[id]['isAjax']) {
		vdpMultipleSelectHideAutocomplete( id, true, true );
		vdpMultipleSource[id]['selectorInput'].val(vdpMultipleSource[id]["lastSearch"]);
		eval(vdpMultipleSource[id]['urlOpenSelector']);
	}
	else {
		if(vdpMultipleSource[id]['open']) {
			vdpMultipleSelectHideAutocomplete( id, true, true );
		}
		else {
			vdpMultipleSelectKeyUp(id, true, event);
			var input = vdpMultipleSource[id]['selectorInput'];
			if(input.length > 0 && input.val().length == 0 )
				input.focus();
		}
	}
}

function vdpMultipleSelectGetNbElementSelected(id) {
	return vdpMultipleSource[id]['selectedValue'].length;
}

function vdpMultipleSelectButtonMinus(id) {
		vdpMultipleSelectGetPlus(id).show();
		vdpMultipleSelectGetMinus(id).hide();
		vdpMultipleSource[id]['isShowAll'] = false;
	vdpMultipleSource[id]['selectorHiddenIsDisplayedAllSelectedItems'].val("0");
}

function vdpMultipleSelectButtonPlus(id) {
		vdpMultipleSelectGetPlus(id).hide();
		vdpMultipleSelectGetMinus(id).show();
		vdpMultipleSource[id]['isShowAll'] = true;
	vdpMultipleSource[id]['selectorHiddenIsDisplayedAllSelectedItems'].val("1");
}

function vdpMultipleSelectSelectionnerTout(id, event) {
	var divItems = vdpCommonSelectGetDivItems( true, id );
	
	var isSelected = divItems.find("ul#vui-combobox-menu").find("input#checkAllItems").attr('checked') ? true : false;
	if(event != null && event.keyCode == 32) {
		isSelected = !isSelected;
	} 
	
	divItems.find("ul#vui-combobox-menu").find("input#checkAllItems").attr("checked", isSelected);
	
	divItems.find("ul#vui-combobox-value").find('li.vui-combobox-item').each(function() {
		var idLi = $(this).attr('id');
		var elt = idLi.replace('item-' + id + '-','');
		
		if(isSelected) {
			if( !vdpInArray(elt, vdpMultipleSource[id]['selectedValue']) )
			{
				$(this).addClass('vui-combobox-item-selected');
				vdpMultipleSource[id]['selectedValue'].push(elt); //splice(0, 0, elt);
			}
		}
		else {
			$(this).removeClass('vui-combobox-item-selected');
			 vdpDeleteElementArray(elt, vdpMultipleSource[id]['selectedValue']);
		}
		
		$(this).find('input').attr('checked', isSelected);
	});
	
	vdpMultipleSelectRecalculteSelectedItemDiv(id);
}

//*****************************************************************************
//
//End - Combobox multiples
//
//*****************************************************************************

//*****************************************************************************
//
//Start - Selecteurs multiples
//
//*****************************************************************************

/****************************/
/**** Fonctions communes ****/
/****************************/
function vdpOnClickShowHideBasketSelectors( idHiddenInput ) {
	if($("#" + idHiddenInput).val() == "0") {
		$("#vui-multiple-selector-root").addClass("vui-basket-visible");
		$("#vui-multiple-selector-root").removeClass("vui-basket-hidden");
		$("#" + idHiddenInput).val("1");
	}
	else {
		$("#vui-multiple-selector-root").removeClass("vui-basket-visible");
		$("#vui-multiple-selector-root").addClass("vui-basket-hidden");
		$("#" + idHiddenInput).val("0");
	}
	lightBoxResizeSelector( $('.lightbox-content') );
}

function vdpOnClickShowHideFiltersSelectors( idHiddenInput ) {
	var buttonSelector = $("#selectorViewShowHideFilters").find(".action-showHideFilter");
	
	if($("#" + idHiddenInput).val() == "0") {
		/* TODO BEC essai de passer en display none pour faire fonctionner les min-height (ne fonctionne pas en display table-cell) mais cela fait foirer la couleur de fond et peut �tre d'autres styles appliqu�s au tableau, le display block fait prendre � la cellule un comportement de block et non plus de cellule
		$("#selector-layout-left-top").css("display","block");
		$("#selector-layout-left-bottom").css("display","block");
		$("#selector-layout-left-filters-hide-top").css("display","none");
		$("#selector-layout-left-filters-hide-bottom").css("display","none");*/
		$("#selector-layout-left-top").show();
		$("#selector-layout-left-bottom").show();
		$("#selector-layout-left-filters-hide-top").hide();
		$("#selector-layout-left-filters-hide-bottom").hide();
		buttonSelector.addClass("hide-filters");
		buttonSelector.removeClass("show-filters");
		$("#" + idHiddenInput).val("1");
		buttonSelector.attr("title", getStaticString( "LG_SELECTOR_HIDE_FILTERS" ));
		buttonSelector.html(buttonSelector.html().replace(getStaticString( "LG_SELECTOR_SHOW_FILTERS" ), getStaticString( "LG_SELECTOR_HIDE_FILTERS" )));
	}
	else {
		/* TODO BEC essai de passer en display none pour faire fonctionner les min-height (ne fonctionne pas en display table-cell) mais cela fait foirer la couleur de fond et peut �tre d'autres styles appliqu�s au tableau, le display block fait prendre � la cellule un comportement de block et non plus de cellule
		$("#selector-layout-left-top").css("display","none");
		$("#selector-layout-left-bottom").css("display","none");
		$("#selector-layout-left-filters-hide-top").css("display","block");
		$("#selector-layout-left-filters-hide-bottom").css("display","block");*/
		$("#selector-layout-left-top").hide();
		$("#selector-layout-left-bottom").hide();
		$("#selector-layout-left-filters-hide-top").show();
		$("#selector-layout-left-filters-hide-bottom").show();
		buttonSelector.addClass("show-filters");
		buttonSelector.removeClass("hide-filters");
		$("#" + idHiddenInput).val("0");
		buttonSelector.attr("title", getStaticString( "LG_SELECTOR_SHOW_FILTERS" ));
		buttonSelector.html(buttonSelector.html().replace(getStaticString( "LG_SELECTOR_HIDE_FILTERS" ), getStaticString( "LG_SELECTOR_SHOW_FILTERS" )));
	}
}

function vdpInitShowHidePanelSelectors( idHiddenInput, type ) {
	if(type == "basket") {
		lightBoxResizeSelector( $('.lightbox-content') );
	}
	else if(type == "filters") {
		var buttonSelector = $("#selectorViewShowHideFilters").find(".action-showHideFilter");
		
		if($("#" + idHiddenInput).val() == "1") {
			buttonSelector.addClass("hide-filters");
			buttonSelector.removeClass("show-filters");
		}
		else {
			buttonSelector.addClass("show-filters");
			buttonSelector.removeClass("hide-filters");
		}
	}
}

/******************************/
/******** XMLSelector *********/
/******************************/
function vdpListViewInitializeSelectOnClick( idListView, onClickEvent )
{
	vdpSelectorOnClickEventParam = onClickEvent;
	
	$("#" + idListView).find(".detail-selectable").each(function() {
		var idDiv = $(this).attr('id');

		// On vide le bind du click pour �tre sur de n'�tre appel� qu'une seule fois
		$(this).unbind("click");
		// Ajout du onClick sur le div
		$(this).click(function() {
			var id = $(this).attr('id');
			// On inverse la valeur de la checkbox pour cocher/d�cocher correctement
			var checked = 'true';
			if($("#" + vdpSelectorCheckbox[id]).attr('checked') == "checked" || $("#" + vdpSelectorCheckbox[id]).attr('checked') == "true") {
				checked = 'false';
			}
			eval(vdpSelectorOnClickEventParam + "('" + idListView + "', '" + id + "', "+ checked +");");
			vdpMultipleSelectorShowDivInfo();
		});
	});
}

function vdpSelectorsInit() {
	lastSearchValueKeyPress = null;
}

function vdpInitializeMultipleSelector( idListView, idHiddenInput, selectedIds, isDegradedItems )
{
	vdpMultipleSelectorDegradedItems = isDegradedItems;
	delete(vdpSelectorCheckbox);
	vdpSelectorCheckbox = new Array();
	$("#basket").find(".basket-content").empty();
	$("#" + idListView ).find(".detail").each(function() {
		var idItem = $(this).attr("id");
		var idCheckbox = $(this).find("input").attr("id");
		vdpSelectorCheckbox[idItem] = idCheckbox;
	});
	
	vdpSelectorIdHiddenInput = idHiddenInput;
	var selectedCheckboxIds = "";
	
	for(id in selectedIds)
	{
		vdpInitializeSelectedItemsMultipleSelector( idListView, selectedIds[id] );
		selectedCheckboxIds += vdpSelectorCheckbox[selectedIds[id]] + ";";
	}
	$("#" + idHiddenInput).val(selectedCheckboxIds);
	vdpMultipleSelectorCountSelectedElement();
}

function vdpInitializeSelectedItemsMultipleSelector(idListView, idItem)
{
	var selectorBasket = $("#basket").find(".basket-content");	
	var addedItem = selectorBasket.find("#" + idItem + "_selected");
	
	if(addedItem.attr("id") == undefined || addedItem.attr("id") == null) {
		// Ajout des class CSS des �lements s�lectionn�s
		var item = $("#" + idItem);
		item.removeClass('detail-not-selected');
		item.addClass('detail-selected');	
		
		var clonedItem;
		var degradedItem = item.find("div.vui-selector-compatibility-paragraph-item");
		if(vdpMultipleSelectorDegradedItems && degradedItem.length > 0)
		{
			clonedItem = degradedItem.find("div.detail").clone();
		}
		else {
		// On clone l'item et on l'ajoute au basket
			clonedItem = $("#" + idItem).clone();
			// On supprime les class de la listview pour les ajouter au panier
			clonedItem.removeClass("detail-unselectable-hidden");
			clonedItem.removeClass("detail-selectable");
			clonedItem.removeClass("detail-selected");
			// On supprime la checkbox
			clonedItem.find("input").remove();
			
			// Suppression de la navigation on capte les liens et on les supprime en r�ajoutant le text du lien
			clonedItem.find("a").each(function() {
				$(this).before($(this).html());
				$(this).remove();
			});
		}
		clonedItem.attr("id", idItem + "_selected");
		
		selectorBasket.prepend(clonedItem); // Ajout en premier de l'�l�ment dans le basket

		// Ajouter onclick dans le div du panier pour d�selectionner
		clonedItem.click(function() {
			var idClonedDiv = $(this).attr('id');
			var id = idClonedDiv.replace("_selected","");
			selectOnClickEvent( idListView, id, false );
			vdpMultipleSelectorShowDivInfo();
		});
	}
	
	vdpMultipleSelectorCountSelectedElement();
}

function vdpMultipleSelectorCountSelectedElement() {
	var $elementCount = $("#elements-count"); 
	$elementCount.empty();
	var nbSelectedElement = $(".basket-content").find(".detail").length;
	$elementCount.append(nbSelectedElement);
	$elementCount.attr("title", nbSelectedElement + " " + getStaticString( "LG_MULTIPLE_SELECT_LIST_NUMBER_CHECKED_ELEMENTS" ));
}

function vdpMultipleSelectorShowDivInfo() {
	var elementCount = $("#elements-count");
	var infoSelector = $('#info');
	
	$('#info span').html($(".basket-content").find(".detail").length);
	infoSelector.css("top", elementCount.position().top + $("#elements-count").outerHeight(true) + "px");
	infoSelector.css("left", elementCount.position().left + elementCount.width() - infoSelector.width()  + "px");
	infoSelector.show().fadeOut(3000, "easeInOutElastic");
}

function selectOnClickEvent(idListView, idItem, checked)
{
	var selectorBasket = $("#basket").find(".basket-content");
	
	if (checked)
	{
		var addedItem = selectorBasket.find("#" + idItem + "_selected");
		if(addedItem.attr("id") == undefined || addedItem.attr("id") == null) {
			// Ajout des class CSS des �lements s�lectionn�s
			var item = $("#" + idItem);
			item.removeClass('detail-not-selected');
			// TODO BEC  BUG-011148 item.removeClass('detail-hover');
			item.addClass('detail-selected');
			
			var clonedItem;
			var degradedItem = item.find("div.vui-selector-compatibility-paragraph-item");
			if(vdpMultipleSelectorDegradedItems && degradedItem.length > 0)
			{
				clonedItem = degradedItem.find("div.detail").clone();
			}
			else {
				// On clone l'item et on l'ajoute au basket
				clonedItem = $("#" + idItem).clone();
				// On supprime les class de la listview pour les ajouter au panier
				clonedItem.removeClass("detail-unselectable-hidden");
				clonedItem.removeClass("detail-selectable");
				clonedItem.removeClass("detail-selected");
				clonedItem.removeClass("detail-hover");
				// On supprime la checkbox
				clonedItem.find("input").remove();
				
				// Suppression de la navigation on capte les liens et on les supprime en r�ajoutant le text du lien
				clonedItem.find("a").each(function() {
					$(this).before($(this).html());
					$(this).remove();
				});
			}
			clonedItem.attr("id", idItem + "_selected");
			
			selectorBasket.prepend(clonedItem); // Ajout en premier de l'�l�ment dans le basket

			// Ajouter onclick dans le div du panier pour d�selectionner
			clonedItem.click(function() {
				var idClonedDiv = $(this).attr('id');
				var id = idClonedDiv.replace("_selected","");
				selectOnClickEvent( idListView, id, false );
				vdpMultipleSelectorShowDivInfo();
			});
		}
	}
	else
	{
		// retrouver le div du panier et le supprimer
		$("#" + idItem + "_selected").remove();
		
		// On change les class des �l�ments d�selectionn�s
		var item = $("#" + idItem);
		item.removeClass('detail-selected');
	// TODO BEC  BUG-011148 item.removeClass('detail-hover');
		item.addClass('detail-not-selected');
	}
	
	vdpMultipleSelectorHandleHiddenInputCheckbox( idItem, checked );
	vdpMultipleSelectorCountSelectedElement();
}

function vdpMultipleSelectorHandleHiddenInputCheckbox(idItem, checked) {
	var idCheckbox = vdpSelectorCheckbox[idItem];
	var labelHiddenInput = $("#" + vdpSelectorIdHiddenInput ).val();
	var ordonateLabelHiddenInput = "";
	
	if(checked) {
		ordonateLabelHiddenInput += labelHiddenInput + idCheckbox + ";";
	}
	else {
		ordonateLabelHiddenInput = labelHiddenInput.replace(idCheckbox + ";", "");
	}
	
	$("#" + vdpSelectorIdHiddenInput ).val(ordonateLabelHiddenInput);
	$("#" + idCheckbox).attr("checked", checked);
}

function vdpMultipleSelectorSearchInSelection() {
	vdpCommonsMultipleSelectorSearchInSelection( $("#searchbar-basket"), $("#basket").find(".basket-content") );
}

function vdpCommonsMultipleSelectorSearchInSelection(inputSearch, containerSelector)
{
	if( inputSearch.length > 0 && containerSelector.length > 0)
	{
		var searchStr = inputSearch.val();
		
		if(searchStr != undefined && searchStr != null && searchStr.length > 0)
			inputSearch.addClass("vui-search-filter-change");
		else inputSearch.removeClass("vui-search-filter-change");
		
		containerSelector.find(".detail").each(function() {
			var visible = true;
			if(searchStr != null && searchStr.length != 0) {
				var itemText = $(this).text().toLowerCase();
				
				if(itemText.indexOf(searchStr.toLowerCase()) == -1) {
					visible = false;
				}
			}
			else {
				visible = true;
			}
			
			if(visible)
				$(this).show();
			else
				$(this).hide();
		});
	}
}

function vdpMultipleSelectorUnselectAll() {
	$("#basket").find(".basket-content").find(".detail").each(function() {
		$(this).trigger('click');
	});
}

function vdpMultipleSelectorUnselectAllDisplayed() {
	$("#basket").find(".basket-content").find(".detail").each(function() {
		if($(this).css("display") != "none" ) {
			$(this).trigger('click');
		}		
	});
}

/*****************************************************************************/
/****** Gestion des appels Ajax pour les s�lecteurs simples et multiples *****/
/*****************************************************************************/
function vdpCommonsSelectorExecuteKeypressSearch(idInputSearch, callbackRefreshPart, timeBeforeRequest, lengthBeforeRequest, idListview)
{
	// La cha�ne recherch�e
	var searchedValue = $("#" + idInputSearch).val();
	
	$("#" + idInputSearch).removeClass("vui-search-filter-change");
	if(searchedValue != null && searchedValue.length > 0)
		$("#" + idInputSearch).addClass("vui-search-filter-change");
	
	if(searchedValue.length >= lengthBeforeRequest && lastSearchValueKeyPress != searchedValue ) {
		lastSearchValueKeyPress = searchedValue; // on met � jour la derni�re valeur recherch�e
		if(vdpAdvancedSelectorSearchInProgress)
		{
			// Il y a d�j� une requ�te en cours on indique au JS qu'il faudra relancer un vdpFireMessage()
			vdpReCallSearchAdvancedSelector = true;
			return;
		}
		else {
			// Si une requ�te a �t� lanc�e on annule le timer pour relancer la nouvelle requ�te
			if(timedCallCommonsSelectorOpen != null) {
				clearTimeout(timedCallCommonsSelectorOpen);
			}
			
			timedCallCommonsSelectorOpen = setTimeout( function() 
																								 {
																										vdpCommonSelectorReloadListviewShowHideLoading(idInputSearch, idListview, callbackRefreshPart, true);
																										eval(callbackRefreshPart);
																								 }, timeBeforeRequest);
		}
	}
}

function vdpCommonSelectorReloadListviewShowHideLoading(idTextbox, idListview, callbackRefreshPart, isLoading) {
	var $selectorListView = $("#" + idListview);
	if( isLoading ) {
		vdpAdvancedSelectorSearchInProgress = isLoading;
		$("#" + idTextbox + "_loading").addClass("vui-selector-loading");
		$selectorListView.empty();
		$selectorListView.addClass("vui-selector-loading");
	}
	else {
		if(vdpReCallSearchAdvancedSelector)
		{
			vdpReCallSearchAdvancedSelector = false;
			$selectorListView.empty();
			$selectorListView.addClass("vui-selector-loading");
			eval(callbackRefreshPart); // on relance une requ�te
		}
		else {
			vdpAdvancedSelectorSearchInProgress = isLoading; // on le passe � faux uniquement si on est pas dans le cas du recall sinon on est encore en chargement
			$("#" + idTextbox + "_loading").removeClass("vui-selector-loading");
			// normalement pas la peine toute la part a �t� recharg�e : $selectorListView.removeClass("vui-selector-loading");	
		}
	}
}

/**** Gestion des auto complete du selecteur simple ****/
function vdpCommonsSimpleSelectorCallAjaxValues(idInputSearch) {
	var timeBeforeFireRequest = vdpSimpleSource[idInputSearch]['timeBeforeFireRequest'];
	var lengthBeforeFireRequest = vdpSimpleSource[idInputSearch]['lengthBeforeFireRequest'];
	
	// La cha�ne recherch�e
	var searchedValue = $("#" + idInputSearch).val();
	vdpSimpleSource[idInputSearch]['lastSearch'] = searchedValue;
	
	//Gestion de l'affichage en orange
	if( !vdpSimpleSource[idInputSearch]['displaySelectionOutside'] && !vdpSimpleSource[idInputSearch]['open'] )
	{
		var selectedLabel = "";
		if( vdpSimpleSource[idInputSearch]['indexSelected'] != null && vdpSimpleSource[idInputSearch]['indexSelected'] != "" 
			&& vdpSimpleSource[idInputSearch]['source'][vdpSimpleSource[idInputSearch]['indexSelected']] != null && vdpSimpleSource[idInputSearch]['source'][vdpSimpleSource[idInputSearch]['indexSelected']] != undefined && vdpSimpleSource[idInputSearch]['source'][vdpSimpleSource[idInputSearch]['indexSelected']] != "" )
			selectedLabel = vdpSimpleSource[idInputSearch]['source'][vdpSimpleSource[idInputSearch]['indexSelected']];
		
		
		if( searchedValue != null && searchedValue != undefined && searchedValue.length > 0 && selectedLabel != searchedValue )
				vdpSimpleSource[idInputSearch]['selectorVuiComboBox'].addClass("vui-combobox-change"); // On affiche le cadre sur le input pour indiquer que la valeur n'est pas une valeur s�lectionn�e
		else vdpSimpleSource[idInputSearch]['selectorVuiComboBox'].removeClass("vui-combobox-change"); // Sinon on enl�ve la classe	
	}
	
	if(searchedValue.length >= lengthBeforeFireRequest) {
		// Si une requ�te a �t� lanc�e on annule le timer pour relancer la nouvelle requ�te
		if(timedCallCommonsSimpleSelectorClose != null) {
			clearTimeout(timedCallCommonsSimpleSelectorClose);
		}
		timedCallCommonsSimpleSelectorClose = setTimeout( function() { vdpCommonsSimpleSelectorGetValues(idInputSearch, searchedValue); }, timeBeforeFireRequest);
	}
	else {
		vdpSimpleSelectHideAutocompleteForSimpleSelector( idInputSearch );
	}
}

function vdpCommonsSimpleSelectorGetValues(idInputSearch, searchedValue) {
	vdpCommonSelectShowHideLoading( idInputSearch, true, false );
	urlCallAjax = vdpSimpleSource[idInputSearch]['urlCallAjax'] + "&WVALUE=" + searchedValue + "&" + vdpSimpleSource[idInputSearch]['idHidden'] + "=" + vdpSimpleSource[idInputSearch]['indexSelected'] + "&action=autocomplete";
	$.vpdaAjaxQueue("simpleSelect", {
		type: 'POST',
		url: urlCallAjax,
    dataType: 'xml',
    contentType: 'text/xml; charset=utf-8',
    asycn: false, // On passe les appels Ajax en synchronis�s pour traiter les requ�te dans l'ordre
    cache: false,
    success: function(data){
    	vdpCommonSelectShowHideLoading( idInputSearch, false, false );
    	
    	// On cr�e le tableau des informations additionnelles
    	delete( vdpSimpleSource[idInputSearch]['additionalInformation'] );
    	vdpSimpleSource[idInputSearch]['additionalInformation'] = new Array();

    	vdpSimpleSource[idInputSearch]['tooltips'] = new Array();
    	
    	// On r�initialise le tableua de valeurs
    	vdpSimpleSource[idInputSearch]['source'] = new Array();
    	
    	vdpSimpleSource[idInputSearch]['moreItems'] = ($(data).find( "root" ).attr("moreItems") == "true");
    	
    	// On le remplit avec les infos r�cup�r�es
      $(data).find( "item" ).each(function() {
      	var index = $(this).attr("id");
      	var isSelected = $(this).attr("selected");
      	vdpSimpleSource[idInputSearch]['source'][index] = $(this).text();
      	
      	var additionalInformation = $(this).attr("additionalInformation");
      	if( additionalInformation != undefined && additionalInformation != null && additionalInformation != "" ) {
      		vdpSimpleSource[idInputSearch]['additionalInformation'][index] = additionalInformation;
      	}
      	
      	if($(this).attr("tooltip-onmouseout") != undefined && $(this).attr("tooltip-onmouseout") != null && $(this).attr("tooltip-onmouseout") != "")
      	{
      		vdpSimpleSource[idInputSearch]['tooltips'][index] = new Array();
      		vdpSimpleSource[idInputSearch]['tooltips'][index]['mouseover'] = $(this).attr("tooltip-onmouseover");
        	vdpSimpleSource[idInputSearch]['tooltips'][index]['mouseout'] = $(this).attr("tooltip-onmouseout");
        	
        	if( isSelected == "selected") {
        		// On met � jour le tooltip sur l'�l�ment s�lectionn�
        		if(vdpSimpleSource[idInputSearch]['displaySelectionOutside']) {
        			vdpSimpleSource[idInputSearch]['selectorSpanSelected'].attr("onmouseover", $(this).attr("tooltip-onmouseover"));
      				vdpSimpleSource[idInputSearch]['selectorSpanSelected'].attr("onmouseout", $(this).attr("tooltip-onmouseout"));
        		}
        		else {
        			vdpSimpleSource[idInputSearch]['selectorInputAC'].attr("onmouseover", $(this).attr("tooltip-onmouseover"));
      				vdpSimpleSource[idInputSearch]['selectorInputAC'].attr("onmouseout", $(this).attr("tooltip-onmouseout"));
        		}
        	}
      	}
      	
      	if( isSelected == "selected"){
      		vdpSimpleSource[idInputSearch]['indexSelected'] = index;
      	}
      });
      
    	$tooltip = $(data).find("tooltips");
    	if($tooltip.length > 0)
    	{
    		$("#vui-selector-tooltips_" + idInputSearch).empty().append($tooltip.text());
    	}
    	
      vdpSimpleSelectShowAutocomplete( idInputSearch );
    	vdpSimpleSelectKeyUp( idInputSearch, false, null );
    }
	});
}

/**** Gestion des auto complete du selecteur multiple ****/
function vdpCommonsMultipleSelectorCallAjaxValues(idInputSearch) {
	var timeBeforeFireRequest = vdpMultipleSource[idInputSearch]['timeBeforeFireRequest'];
	var lengthBeforeFireRequest = vdpMultipleSource[idInputSearch]['lengthBeforeFireRequest'];
	
	// La cha�ne recherch�e
	var searchedValue = $("#" + idInputSearch).val();
	vdpMultipleSource[idInputSearch]['lastSearch'] = searchedValue;
	
	if(searchedValue.length >= lengthBeforeFireRequest) {
		// Si une requ�te a �t� lanc�e on annule le timer pour relancer la nouvelle requ�te
		if(timedCallCommonsMultipleSelectorClose != null) {
			clearTimeout(timedCallCommonsMultipleSelectorClose);
		}
		
		timedCallCommonsMultipleSelectorClose = setTimeout( function() { vdpCommonsMultipleSelectorGetValues(idInputSearch, searchedValue); }, timeBeforeFireRequest);
	}
	else {
		vdpMultipleSelectHideAutocomplete( idInputSearch, true, false );
	}
}

function vdpCommonsMultipleSelectorGetValues(idInputSearch, searchedValue) {
	vdpCommonSelectShowHideLoading( idInputSearch, true, true );
	var  idHidden = vdpMultipleSource[idInputSearch]['idHidden'];
	urlCallAjax = vdpMultipleSource[idInputSearch]['urlCallAjax'] + "&WVALUE=" + searchedValue + "&" + idHidden + "=" + $("#" + idHidden).val() + "&action=autocomplete";
	$.vpdaAjaxQueue("multipleSelect",{
		type: 'POST',
		url: urlCallAjax,
    dataType: 'xml',
    contentType: 'text/xml; charset=utf-8',
    asycn: false, // On passe les appels Ajax en synchronis�s pour traiter les requ�te dans l'ordre
    success: function(data){
    	vdpCommonSelectShowHideLoading( idInputSearch, false, true );
    	// On cr�e le tableau des informations additionnelles
    	delete( vdpMultipleSource[idInputSearch]['additionalInformation'] );
    	vdpMultipleSource[idInputSearch]['additionalInformation'] = new Array();
    	
    	delete( vdpMultipleSource[idInputSearch]['tooltips'] );
    	vdpMultipleSource[idInputSearch]['tooltips'] = new Array();
    	
    	// On r�initialise le tableua de valeurs
    	delete(vdpMultipleSource[idInputSearch]['source']);
    	vdpMultipleSource[idInputSearch]['source'] = new Array();
    	delete(vdpMultipleSource[idInputSearch]['selectedValue']);
    	vdpMultipleSource[idInputSearch]['selectedValue'] = new Array();
    	
    	vdpMultipleSource[idInputSearch]['moreItems'] = ($(data).find( "root" ).attr("moreItems")=="true");
    	
    	// On le remplit avec les infos r�cup�r�es
      $(data).find( "item" ).each(function() {
      	var index = $(this).attr("id");
      	vdpMultipleSource[idInputSearch]['source'][index] = $(this).text();
      	
      	var additionalInformation = $(this).attr("additionalInformation");
      	if( additionalInformation != undefined && additionalInformation != null && additionalInformation != "" ) {
      		vdpMultipleSource[idInputSearch]['additionalInformation'][index] = additionalInformation;
      	}
      	
      	if($(this).attr("tooltip-onmouseout") != undefined && $(this).attr("tooltip-onmouseout") != null && $(this).attr("tooltip-onmouseout") != "")
      	{
      		vdpMultipleSource[idInputSearch]['tooltips'][index] = new Array();
      		vdpMultipleSource[idInputSearch]['tooltips'][index]['mouseover'] = $(this).attr("tooltip-onmouseover");
      		vdpMultipleSource[idInputSearch]['tooltips'][index]['mouseout'] = $(this).attr("tooltip-onmouseout");
      	}
      	
      	if($(this).attr("selected") == "selected") {
      		vdpMultipleSource[idInputSearch]['selectedValue'].push(index); //splice(0, 0, index);
      	}
      	
      });
      
      $tooltip = $(data).find("tooltips");
    	if($tooltip.length > 0)
    	{
    		$("#vui-selector-tooltips_" + idInputSearch).empty().append($tooltip.text());
    		vdpMultipleSelectRecalculteSelectedItemDiv( idInputSearch );
    	}
    	
    	vdpMultipleSelectKeyUp( idInputSearch, false, null );
    },
    error: function(e){
    	// TODO BEC � supprimer avant la mise en prod
    	alert("error call ajax vdpCommonsMultipleSelectorGetValues() : " + e)
    }
	});
}
//*****************************************************************************
//
// End - Selecteurs multiples
//
//*****************************************************************************


//******************************************************************************************************************
//
// Plugin JQuery BEC appel Ajax avec gestion empilement des appels
// Si on empile plusieurs appels Ajax pendant qu'une requ�te est en cours on ne prend en compte que le dernier appel
//
//******************************************************************************************************************
jQuery.vpdaAjaxQueue = function (queue, options)
{
	// On initialise le plugin si il ne l'est pas
	if (typeof document.vpdaAjaxQueue == "undefined") {
		document.vpdaAjaxQueue = {queue:{}, request: null};
	}

	// On cr�e la file si c'est la premi�re requ�te
	if (typeof document.vpdaAjaxQueue.queue[queue] == "undefined") {
		document.vpdaAjaxQueue.queue[queue] = [];
	}
	
	if (typeof options != "undefined") // On v�rifie que les options sont pr�sentes
	{
		// On sauvegarde les options avant de surcharger le complete
		var optionsCopy = {};
		for (var o in options) {
			optionsCopy[o] = options[o];
		}
		options = optionsCopy;
		var originalCompleteCallback = options.complete;
		options.complete = function (request, status)
		{
			// On enl�ve l'appel que l'on vient d'executer de la file
			document.vpdaAjaxQueue.queue[queue].shift();
			// On vide la requete
			document.vpdaAjaxQueue.request = null;
			
			// On lance le callback d'origine
			if (originalCompleteCallback) {
				originalCompleteCallback(request, status);
			}

			// On lance la requete d'apr�s
			if (document.vpdaAjaxQueue.queue[queue].length > 0) {
				document.vpdaAjaxQueue.request = jQuery.ajax(document.vpdaAjaxQueue.queue[queue][0]);
			}
		};

    // Gestion par d�faut d'une erreur si le callback n'est pas d�finit
		if( !options.error )
		{
		    options.error = function ( jqXHR, textStatus, errorThrown )
		    {
		            alert("error occurred.");
		    };
		}
		
		// Gestion des erreurs retourn� par un success
		var originalSuccessCallback = options.success;
    options.success = function ( data, textStatus, jqXHR )
    {
      var error = vdpAjaxError(data);
      // On lance le callback d'origine
    	if (originalSuccessCallback)
    	{
    	    originalSuccessCallback( data, textStatus, jqXHR );
    	}
    }

		// Si on a d�j� deux appel, on supprime le dernier appel pour ne prendre en compte que le dernier
		if(document.vpdaAjaxQueue.queue[queue].length == 2) {
			document.vpdaAjaxQueue.queue[queue].pop();
		}
		
		// On ajoute l'appel � la file
		document.vpdaAjaxQueue.queue[queue].push(options);

		// Si aucun autre appel n'est en cours on le lance
		if (document.vpdaAjaxQueue.queue[queue].length == 1) {
			document.vpdaAjaxQueue.request = jQuery.ajax(options);
		}
	}
	else // Si on a pas de request on vide la file et on annule le dernier appel
	{
		if (document.vpdaAjaxQueue.request)
		{
			document.vpdaAjaxQueue.request.abort();
			document.vpdaAjaxQueue.request = null;
		}

		document.vpdaAjaxQueue.queue[queue] = [];
	}
}

//Fonction fix IE preventDefault
function vdpPreventDefault(event) {
	if(event != null && event != undefined) {
		if (event && event.preventDefault) {
			event.preventDefault();
		}
		else {
			event.returnValue = false;
		}
	}
}

//*****************************************************************************
//
//Start - Collapse/Expand
//
//*****************************************************************************
function vdpCollapseExpandInit(idNavigator, idMainSection, mode, collapsibleChildren, collapseChildren, javascriptArraySubSections) {
	vdpCollapseExpandIdNavigatorIdMainSection[idNavigator] = idMainSection;
	
	vdpCollapseExpandSections[idMainSection] = new Array();
	
	vdpCollapseExpandSections[idMainSection]['previousOpenSection'] = null;
	vdpCollapseExpandSections[idMainSection]['mode'] = mode;
	
	var subSectionsArray = new Array();
	for(IdSubSection in javascriptArraySubSections) {
		if(!javascriptArraySubSections[IdSubSection]['collapsible'])
			continue;
		subSectionsArray[IdSubSection] = new Array();
		subSectionsArray[IdSubSection]['cssClass'] = javascriptArraySubSections[IdSubSection]['cssClass'];
		subSectionsArray[IdSubSection]['collapsible'] = javascriptArraySubSections[IdSubSection]['collapsible'];
		subSectionsArray[IdSubSection]['collapse'] = javascriptArraySubSections[IdSubSection]['collapse'];
		subSectionsArray[IdSubSection]['selector'] = $("#" + IdSubSection);
		subSectionsArray[IdSubSection]['hidden'] = $("#" + javascriptArraySubSections[IdSubSection]['hidden'] );
		subSectionsArray[IdSubSection]['content'] = $("#" + IdSubSection + "_content");
		subSectionsArray[IdSubSection]['title'] =  $("#" + IdSubSection + "_title");
		subSectionsArray[IdSubSection]['title'].unbind("click.expandCollapse").bind("click.expandCollapse", function() { vdpCollapseExpandActionClick(idMainSection, this) });
		
		if(mode == "accordion" && !subSectionsArray[IdSubSection]['collapse']) {
			vdpCollapseExpandSections[idMainSection]['previousOpenSection'] = IdSubSection;
		}
		
		delete(javascriptArraySubSections[IdSubSection]);
		
	}
	vdpCollapseExpandSections[idMainSection]['subSections'] = subSectionsArray;
}

function vdpCollapseExpandExpandAll(idMainSection) {
	for(subSectionId in vdpCollapseExpandSections[idMainSection]['subSections']) {
		vdpCollapseExpandDoExpandCollapse(idMainSection, subSectionId, true );
	}
}

function vdpCollapseExpandCollapseAll(idMainSection) {
	for(subSectionId in vdpCollapseExpandSections[idMainSection]['subSections']) {
		vdpCollapseExpandDoExpandCollapse(idMainSection, subSectionId, false );
	}
} 

function vdpCollapseExpandClear(idNavigator) {
	if(vdpCollapseExpandIdNavigatorIdMainSection != undefined && vdpCollapseExpandIdNavigatorIdMainSection != null
			&& vdpCollapseExpandIdNavigatorIdMainSection[idNavigator] != undefined && vdpCollapseExpandIdNavigatorIdMainSection[idNavigator] != null ) {
		var idMainSection = vdpCollapseExpandIdNavigatorIdMainSection[idNavigator];
		for(subSectionId in vdpCollapseExpandSections[idMainSection]['subSections']) {
			vdpCollapseExpandSections[idMainSection]['subSections'][subSectionId]['title'].unbind("click.expandCollapse");	
		}
		delete(vdpCollapseExpandSections[idMainSection]);
		delete(vdpCollapseExpandIdNavigatorIdMainSection[idNavigator]);
	}
}

vdpCollapseExpandActionClick = function (idParent, self) {
	var id = $(self).attr("id").replace("_title", "");
	if(vdpCollapseExpandSections[idParent] != null && vdpCollapseExpandSections[idParent] != undefined 
			&& vdpCollapseExpandSections[idParent]['subSections'][id] != null && vdpCollapseExpandSections[idParent]['subSections'][id] != undefined) {
		var hidden = vdpCollapseExpandSections[idParent]['subSections'][id]['hidden'];
		var isExpand = hidden.val() == "false";
		vdpCollapseExpandDoExpandCollapse(idParent, id, !isExpand );
	}
}

function vdpCollapseExpandDoExpandCollapse(idParent, id, isExpand) {
	if(vdpCollapseExpandSections[idParent]['mode'] == "advanced") {
		vdpCollapseExpandDoExpandCollapseModeAdvanced( idParent, id, isExpand );
	}
	else if(vdpCollapseExpandSections[idParent]['mode'] == "accordion") {
		vdpCollapseExpandDoExpandCollapseModeAccordion( idParent, id );
	}
}

function vdpCollapseExpandDoExpandCollapseModeAccordion(idParent, id) {
	if(vdpCollapseExpandSections[idParent]['previousOpenSection'] != id) {
		var previousId = vdpCollapseExpandSections[idParent]['previousOpenSection'];
		vdpCollapseExpandSections[idParent]['previousOpenSection'] = id;
		
		var hiddenPrevious = vdpCollapseExpandSections[idParent]['subSections'][previousId]['hidden'];
		var sectionContentPrevious = vdpCollapseExpandSections[idParent]['subSections'][previousId]['content'];
		var sectionPrevious = vdpCollapseExpandSections[idParent]['subSections'][previousId]['selector'];
		var cssClassPrevious = vdpCollapseExpandSections[idParent]['subSections'][previousId]['cssClass'];
		
		hiddenPrevious.val("true");
		sectionPrevious.removeClass(cssClassPrevious).removeClass("vui-section-expanded").addClass("vui-section-collapsed").addClass(cssClassPrevious);
		sectionContentPrevious.slideUp(600, function () {
			var hidden = vdpCollapseExpandSections[idParent]['subSections'][id]['hidden'];
			var sectionContent = vdpCollapseExpandSections[idParent]['subSections'][id]['content'];
			var section = vdpCollapseExpandSections[idParent]['subSections'][id]['selector'];
			var cssClass = vdpCollapseExpandSections[idParent]['subSections'][id]['cssClass'];
			
			hidden.val("false");
			sectionContent.slideDown(600);
			section.removeClass(cssClass).removeClass("vui-section-collapsed").addClass("vui-section-expanded").addClass(cssClass);
		});
	}
}

function vdpCollapseExpandDoExpandCollapseModeAdvanced(idParent, id, isExpand) {
	var hidden = vdpCollapseExpandSections[idParent]['subSections'][id]['hidden'];
	var sectionContent = vdpCollapseExpandSections[idParent]['subSections'][id]['content'];
	var section = vdpCollapseExpandSections[idParent]['subSections'][id]['selector'];
	var cssClass = vdpCollapseExpandSections[idParent]['subSections'][id]['cssClass'];
	
	if(isExpand) {
		hidden.val("false");
		sectionContent.slideDown(600);
		section.removeClass(cssClass).removeClass("vui-section-collapsed").addClass("vui-section-expanded").addClass(cssClass);
	}
	else {
		hidden.val("true");
		sectionContent.slideUp(600);
		section.removeClass(cssClass).removeClass("vui-section-expanded").addClass("vui-section-collapsed").addClass(cssClass);
	}
}

//*****************************************************************************
//
//End - Collapse/Expand
//
//*****************************************************************************

//*****************************************************************************
//
//Start - Editeur de formule
//
//*****************************************************************************
var vdpFormulaIdHiddenInputPosition = null;
var vdpFormulaIdTextArea = null;

function vdpConstructFormulaEditor(formulaIdTextArea, idHiddenInputPosition) {
	vdpFormulaIdHiddenInputPosition = idHiddenInputPosition;
	vdpFormulaIdTextArea = formulaIdTextArea;
	vdpFormulaRestoreFocusPosition();
}

function vdpFormulaSaveFocusPosition()
{
	var sel;
	try
	{
		sel = $("#" + vdpFormulaIdTextArea ).getSelection();
	}
	catch(error)
	{
		var contentLength = 0;
		if($("#" + vdpFormulaIdTextArea ).val() != null && $("#" + vdpFormulaIdTextArea ).val() != undefined)
			contentLength = $("#" + vdpFormulaIdTextArea ).val().length;
		sel =  {start : contentLength, end : contentLength};
	}
	$("#" + vdpFormulaIdHiddenInputPosition).val(sel.start+"-"+sel.end);
}

/**
 * Restaure la s�lection dans la textarea donne le focus et retourne les indices de la s�lection
 * @returns sel indices de la s�lection sel.start et sel.end
 */
function vdpFormulaRestoreFocusPosition()
{
	var sel = vdpGetSel();
	var $textarea = $("#" + vdpFormulaIdTextArea );
	$textarea.focus();
	$textarea.setSelection(sel.start, sel.end);
	return sel;
}

function vdpGetSel()
{
	var value = $("#" + vdpFormulaIdHiddenInputPosition).val();
	if(value == null || value == undefined || value == "" || value.indexOf('-') == -1) {
		var textAreaValue = $("#" + vdpFormulaIdTextArea ).val();
		if(textAreaValue == null || textAreaValue == undefined)
			return {start : 0, end : 0};
		else return {start : textAreaValue.length, end : textAreaValue.length};
	}
	else {
		var array = value.split("-");
		return {start : array[0], end : array[1]};
	}
}

function vdpInsertTag(startTag, endTag) {
	vdpSurroundSelection(startTag, endTag, "select");
}

function vdpReplaceSelectionSelect(replacementValue) {
	vdpReplaceSelection(replacementValue, "select");
}

function vdpReplaceSelectionNoSelection(replacementValue) {
	vdpReplaceSelection(replacementValue, "collapseToEnd");
}

function vdpInsertValue(insertedValue) {
	vdpInsertAfterSelection(insertedValue, "select");
}

function vdpInsertValueWithoutSelection(insertedValue) {
	vdpInsertAfterSelection(insertedValue, "collapseToEnd");
}

function vdpReplaceSelectionNoSelectionThrowEvents(insertedValue) {
	vdpInsertAfterSelection(insertedValue, "collapseToEnd");
}

/**
 * Remplace la s�lection
 * 
 * @param value la valeur � remplacer
 * @param selectionBehaviour comportement de la s�lection
 *			"select": Selects the inserted text
 *   		"collapseToStart": Collapses the selection to a caret at the start of the inserted text
 *   		"collapseToEnd": Collapses the selection to a caret at the end of the inserted text 
 */
function vdpReplaceSelection(value, selectionBehaviour)
{
	var sel = vdpFormulaRestoreFocusPosition();
	if(sel.start == sel.end)
		$("#" + vdpFormulaIdTextArea ).insertText(value, sel.start, selectionBehaviour);
	else $("#" + vdpFormulaIdTextArea ).replaceSelectedText(value, selectionBehaviour);
	vdpResetSelectionAfterInsertValue( value, sel.start, sel.end, selectionBehaviour );
}

/**
 * Insert la valeur apr�s la s�lection
 * 
 * @param value la valeur � ins�rer
 * @param selectionBehaviour comportement de la s�lection
 *			"select": Selects the inserted text
 *   		"collapseToStart": Collapses the selection to a caret at the start of the inserted text
 *   		"collapseToEnd": Collapses the selection to a caret at the end of the inserted text 
 */
function vdpInsertAfterSelection(value, selectionBehaviour)
{
	var sel = vdpFormulaRestoreFocusPosition();
	$("#" + vdpFormulaIdTextArea ).insertText(value, sel.end, selectionBehaviour);
	vdpResetSelectionAfterInsertValue( value, sel.start, sel.end, selectionBehaviour );
}

/**
 * Entoure la s�lection
 * 
 * @param startTag la valeur � ajouter avant la valeur s�lectionn�e
 * @param endTag la valeur � ajouter apr�s la valeur s�lectionn�e
 * @param selectionBehaviour comportement de la s�lection
 *			"select": Selects the inserted text
 *   		"collapseToStart": Collapses the selection to a caret at the start of the inserted text
 *   		"collapseToEnd": Collapses the selection to a caret at the end of the inserted text 
 */
function vdpSurroundSelection(startTag, endTag, selectionBehaviour)
{
	var sel = vdpFormulaRestoreFocusPosition();
	$textarea = $("#" + vdpFormulaIdTextArea );
	$textarea.surroundSelectedText(startTag, endTag, selectionBehaviour);
	var value = $textarea.val().substring(sel.start, sel.end);
	var startSelection =  parseInt(sel.start) + parseInt(startTag.length);
	vdpResetSelectionAfterInsertValue( value, startSelection, sel.end, selectionBehaviour );
}

function vdpResetSelectionAfterInsertValue(value, start, end, selectionBehaviour)
{
	if(value != null && value != undefined)
	{
		var selectionEnd;
		var selectionStart;
		if(selectionBehaviour == "select")
		{
			selectionStart = start;
			selectionEnd = parseInt(start) + parseInt(value.length);
		}
		else if(selectionBehaviour == "collapseToStart")
		{
			selectionStart = parseInt(start);
			selectionEnd = selectionStart;
		}
		else // Comportement par d�faut collapseToEnd
		{
			selectionStart = parseInt(start) + parseInt(value.length);
			selectionEnd = selectionStart;
		}
		
		$("#" + vdpFormulaIdTextArea ).setSelection(selectionStart, selectionEnd);
		$("#" + vdpFormulaIdHiddenInputPosition).val(selectionStart+"-"+selectionEnd);
	}
}
//*****************************************************************************
//
//End - Editeur de formule
//
//*****************************************************************************

//*****************************************************************************
// Start - Popup Menu
//*****************************************************************************
function popupMenuPartFireMessage( formName, formData )
{
	$formPopupMenu = $("#" + formName + "_popup_menu");
	if($formPopupMenu.length > 0)
	{
		if(formData != null && formData.length > 0 )
			formData += "&" + $formPopupMenu.serialize();
		else formData = $formPopupMenu.serialize();
		vdpPopupMenuScreenState = null; // On remet le menu en cours � null pour ne pas copier l'ancienne version du DOM dans la nouvelle quand on fait un fire
	}
	return formData;
}
//*****************************************************************************
// End - Popup Menu
//*****************************************************************************

function VDocCKEditor_getUrlParam( paramName ) {
  var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' ) ;
  var match = window.location.search.match(reParam) ;

  return ( match && match.length > 1 ) ? match[ 1 ] : null ;
}

function vdpToggleDisplay(src, hidden, requestUrl){
	var src = $('#'+src);
	
	var $hidden = $("#" + hidden);
	var id = $hidden.val();
	if (id != 'closed' )
	{
		src.hide();
		$hidden.val( 'closed' );
	}
	else{
		src.show();
		$hidden.val( '' );
	}
	
	$.ajax({
	  url: requestUrl,
	  dataType: 'xml',
	  success: function( data ) {
	  }
	});
}

function vdpGetRestoreScrollPositions()
{
	if( document.documentElement && document.documentElement.scrollTop )
		return document.documentElement;
	return document.body;
}