/* body ad calls */

if (calls==null)
{
	var calls = new Array();
	var ERR_FOCUS = false;
	var Gecko = navigator.userAgent.indexOf("Gecko") != -1;
	NS4 = (document.layers) ? true : false;
}

function callOnLoad(method)
{
	calls[calls.length] = method;		
}

function doOnLoad() 
{
	//doOnLoad([focusOnFirstForm])
	
	//set focus on first found form element
	var focusOnFirstForm=(arguments[0]==null||arguments[0]==true);
	var registerAutosubmit=(arguments[1]==null||arguments[1]==true);
	//register autosubmit
	if( registerAutosubmit )
		registerAutoSubmit();
	
	if(focusOnFirstForm)
	{
		formfocus('text','textarea','password');
	}
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
			if(thrower.length > 40)
				thrower = thrower.substr(0,40) + '[...]';
			estack[estack.length] = "An exception occurred in the script: " + thrower + ". " + e.name 
			  + ": " + e.message; 
		}
	}
	if(estack.length > 0) {
		
		if(navigator.userAgent.indexOf("MSIE") > 0) {
			try { window.status = estack[0]; } catch(e) {}
		}
		throw estack[0];
	}
	calls = new Array();
	try {
		showPostAction( true );
  } catch(e) {}
}

function registerAutoSubmit()
{
		var k=0;
		for(;k<document.forms.length;k++)
		{
			if (document.forms.length > 0)
			{
				var el, type, i = 0, j, els = document.forms[k].elements;
				while (el = els[i++])
				{
					var unregistered = false;
					if((el.getAttribute('unregisterautosubmit') && el.getAttribute('unregisterautosubmit')=='true'))
						unregistered = true;
					if(!unregistered && el.type!='hidden' && el.type!='textarea')
					{
						el.onkeypress=autosubmit;					
					}
				}
			}
		}
}

function setFocusOnElement(field,bSelectField)
{
	var obj;
	try {
			// old method: field was a string
			obj = document.getElementById(field);
		} catch(e) {}
	if (obj && null!=obj)
	{
		try {
		  obj.focus();
		  if (setFocusOnElement.arguments[1] == "true")
		  {
		  	obj.select();
		  }
	  } catch(e) {}
	}
	else
	{		
		try {
			field.focus();
			if (setFocusOnElement.arguments[1] == "true")
			  {
				field.select();
			  }
		} catch(e) {}
	}
}

function focusOnError(field)
{
	try {
		var obj = document.getElementById(field);
		if (!ERR_FOCUS && obj)
		{
		  obj.focus();
		  ERR_FOCUS = true;
		}
	} catch(e) { ERR_FOCUS = false; }
}

function showHideObj(obj)
{
  if (obj && obj.style)
  {  
  	try {
  		(obj.style.display == 'none') ? obj.style.display = '' : obj.style.display = 'none';
  	} catch(e) {}
  }
  else
  {
  	obj = document.getElementById(obj);
  	showHideObj(obj);
  }
}

function flash(elt)
{
 if (document.all)
 {
    var intrvl=0;
	 var nTimes;
    var cn = elt.className;
	 for(nTimes=0;nTimes<3;nTimes++)
    {
       intrvl += 50;
       setTimeout("document." + elt.form.name + "." + elt.name +".className='"+cn+" flashColor1';",intrvl);
       intrvl += 100;
       setTimeout("document." + elt.form.name + "." + elt.name +".className='"+cn+" flashColor2';",intrvl);
    }
 }
 elt.focus();
}


/* delete whitespace before and after val */
function trim(val)
{
 if (!val) return val;

 while(val.charAt(0) == ' ') val = val.substring(1,val.length);
 while(val.charAt(length)==' ')  val = val.substring(0,val.length-1);

 return val;
}

function showHide(objID)
{
	try
	{
		var obj = document.getElementById(objID);
		var caller=showHide.arguments[1];
		if(caller && (typeof caller=='object'))
		{
			
			if(caller.className.indexOf("-collapsed") > 0)
				caller.className = caller.className.replace("-collapsed","-expanded");
			else if(caller.className.indexOf("-expanded") > 0)
				caller.className = caller.className.replace("-expanded","-collapsed");
		}
		(obj.style.display=="none") ? obj.style.display="" : obj.style.display="none";
	}
	catch (e) { 
			raiseError("showHide()",e); 
	}
}

function raiseError(fct,e)
{
	// Handle error here; error message is available as e.message
   // Leave empty to hide all errors.
	var edesc;
	if(e.number)
	{
		if(navigator.userAgent.indexOf("MSIE") > 0) //Internet Explorer 5+
		{
			edesc = ((e.number!='undefined')?e.number:"") + " " + ((e.description!='undefined')?e.description:"??")
		}
		else  //other browsers
		{
			edesc = ((e.number!=undefined)?e.number:"") + " " + ((e.message!=undefined)?e.message:"??")
		}
		alert(fct + " call error\n\n" + edesc)
	}
	else
	{
		alert(fct + " call error\n\n" + e);
	}
}

function navigate(url)
{
	window.location.href=url;
}

function doSubmit(frm)
{
	/*
	frm: the form object
	action: the form action (optional)
	target: the form target (optional)
	forwardUrl: need a 'forwardUrl' hidden field (optional)
	*/
	try
	{
		var frmaction=doSubmit.arguments[1];
		var frmtarget=doSubmit.arguments[2];
		var frmforward=doSubmit.arguments[3];
		if(frm)
		{
			if(frmaction)
			{
				frm.action = frmaction;
			}
			if(frmtarget)
			{
				frm.target = frmtarget;
			}
			if(frmforward && frm.forwardUrl)
			{
				frm.forwardUrl.value = frmforward;
			}
			frm.submit();
			frm.target = "";
		}
	}
	catch (e) { 
		raiseError("doSubmit()",e);
	}
}

/*
popup function

string url
int width
int height
int resizable 0/1
int scrollbars 0/1
int status 0/1
int toolbar 0/1
[string name]
*/
function popup(url,width,height,resizable,scrollbars,status,toolbar)
{
	var name = popup.arguments[8];
	var returnobject = popup.arguments[9];
	if(!name)
		name = "popup_"+new Date().getTime();	
	var leftpos = (screen.width) ? (screen.width-width)/2 : 0;
    var toppos =  (screen.height) ? (screen.height-height)/2 : 0;
    var autocenterargs = ",left=" + leftpos + ",top=" + toppos;
    var menubar = (toolbar==1 ?toolbar:0);
	var popupargs = "width="+width+",height="+height+",location=0,menubar="+menubar+",resizable="+resizable+",scrollbars="+scrollbars+",status="+status+",toolbar="+toolbar+autocenterargs;
	if(returnobject=="true")
	{
		var win = window.open(url,name,popupargs);
		return win;
	}
	else
	{
		window.open(url,name,popupargs);
		void(0);
	}
}

/**
 * callSelector method
 * 
 * form object method should be POST
 * insert at top of the page:
 * <%@ taglib uri='http://www.axemble.com/taglibs/commons-1.0' prefix='cms' %>
 * insert within form:
 * <cms:selector />
 * 
 * sample:
 *
 * 	callSelector(
 *		document.forms.adminForm,
 *		'portal/screen/Navigate/app/selector?_uri=/multiple/localization',
 *		'opener.location.reload()',
 *		'com.axemble.vdocportal.components.common.beans.MySelectorBag',
 *		750,400,5,1,1,"com.axemble.vdocportal.common.connectors.myconnector");
 */
 
var SELECTOR_VIEW=0;
var SELECTOR_MANAGE=1;
var SELECTOR_UNINHERITABLE=0;
var SELECTOR_INHERITABLE=1;

function callSelector(frm)
{
	try
	{
		if(frm)
		{
			var selectorUrl = callSelector.arguments[1];
			var openerUrl = callSelector.arguments[2];
			var bagClass = callSelector.arguments[3];
			var w = callSelector.arguments[4];
			var h = callSelector.arguments[5];
			if(h && typeof h === 'number' && isFinite(h)) {
				h+=50;
			}
			var maxitems = callSelector.arguments[6];
			var inheritability = callSelector.arguments[7];
			var context = callSelector.arguments[8];
			var connector = callSelector.arguments[9];
			var syntax = "\n\ncallSelector(frm,selectorUrl,openerUrl,bagClass,width,height,[maxitems],[inheritability],[context],[connector])";
			var leftpos = (screen.width) ? (screen.width-w)/2 : 0;
		    var toppos =  (screen.height) ? (screen.height-h)/2 : 0;
		    var autocenterargs = ",left=" + leftpos + ",top=" + toppos;
    
			if(!selectorUrl)
			{
				throw("selectorUrl argument is mandatory"+syntax);
			}
			if(!openerUrl)
			{
				throw("openerUrl argument is mandatory"+syntax);
			}
			if(!bagClass)
			{
				throw("bagClass argument is mandatory"+syntax);
			}
			if(!w)
			{
				throw("width argument is mandatory"+syntax);
			}
			if(!h)
			{
				throw("height argument is mandatory"+syntax);
			}
			var win = window.open(
			"",
			"__selector_window",
			"width="+w+",height="+h+",location=0,menubar=0,resizable=1,scrollbars=0,status=1,toolbar=0"+autocenterargs)
			var frmaction = frm.action;
			var frmtarget = frm.target;
			
			if(win == null )
			{
			   alert("Error opening selector popup.\nPlease disable any popup blocker for the site.");
			}
			else
			{			
				frm.action = selectorUrl;			
				frm.target = win.name;
				frm.openerUrl.value=openerUrl;
				frm.bagClass.value=bagClass;
				if(maxitems)
				{
					frm.maxItems.value=maxitems;
				}
				if(inheritability==SELECTOR_INHERITABLE || inheritability==SELECTOR_UNINHERITABLE)
				{
					frm.inheritability.value=inheritability;
				}
				if(context==SELECTOR_VIEW || context==SELECTOR_MANAGE)
				{
					frm.context.value=context;
				}
				if(connector)
				{
					frm.connector.value=connector;
				}
				frm.submit();
				//init parameters
				frm.action = frmaction;
				frm.target = frmtarget;
				frm.openerUrl.value = "";
				frm.openerUrl.value = "";
				frm.maxItems.value = "";
				frm.inheritability.value = "";
				frm.connector.value = "";
				frm.context.value = "";
			}
		}
	}
	catch (e) { 
		raiseError("callSelector()",e);
	}
}

function doCheckElements(frm, checkbox, groupid)
{
	/*
	frm: the form object
	checkbox: the source checkbox
	*/
	try
	{	
		if(frm!=null && checkbox!=null)
		{	
			for(var i=0;i<frm.elements.length;i++)
			{
				var elemgroupid = null;
				if(groupid!=null)
				{
					groupid = groupid.toLowerCase();
					elemgroupid = frm.elements[i].groupid;
					if(elemgroupid!=null) elemgroupid = elemgroupid.toLowerCase();
				}
				else
				{
					groupid = null;
					elemgroupid = null;
				}
	
				if(frm.elements[i].type.toLowerCase()=="checkbox" && elemgroupid==groupid)
				{
					if(!frm.elements[i].disabled)
					{
						frm.elements[i].checked = checkbox.checked;
					}
				}
			}
		}
	
	}
	catch (e) 
	{ 
		raiseError("doCheckElements()",e);
	}
}

function setWindowTitle(title)
{
	document.title = title;
}

var task_running=false;
var stop_refresh=false;
var statusTemplate;
var refresh_ms=2000;

function startTask(template)
{
	try
	{
		var elementToHide = startTask.arguments[1];
		var elementToDisplay = startTask.arguments[2];
		var ms = startTask.arguments[3];
		if(!template)
		{
			throw("template argument is mandatory");
		}
		if(elementToHide)
		{
			var elmt=document.getElementById(elementToHide);
			elmt.style.display="none";			
		}
		if(elementToDisplay)
		{
			elmt=document.getElementById(elementToDisplay);
			elmt.style.display="";
		}
		if(ms)
		{
			refresh_ms=ms;
		}
		if(!task_running)
		{
			statusTemplate=template;
			task_running=true;			
			updateTasksStatus();
		}
		else
		{
			task_running=false;
			stop_refresh=true;
		}
	}
	catch(e)
	{
		raiseError("startTask()",e);
	}
}
var request = null;
var xhr_object = null;
//works with <cms:tasksstatus />
function updateTasksStatus()
{	
	try {	
		// branch for native XMLHttpRequest object
		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
			request.onreadystatechange = CallBackRequest;
			request.open("GET", statusTemplate, true);
			request.send(null);
	
		// branch for IE/Windows ActiveX version
		} else if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
			if (request) {
				request.onreadystatechange = CallBackRequest;
				request.open("GET", statusTemplate, true);
				request.send();
			}
		}
	}
	catch(e)
	{
		raiseError("updateTasksStatus()",e);
	}
}

function CallBackRequest() {
	// Sur le retour de la requete, on teste son �tat
	if ( request.readyState == 4 ) {
		// On injecte notre retour dans la DIV prevue a cet effet
		var TasksStatus=document.getElementById("TasksStatus");
		if(!TasksStatus) {
			throw("<cms:tasksstatus /> not found");
		}
		else {
			TasksStatus.innerHTML = request.responseText;
			if(!stop_refresh)
			{					
				setTimeout("updateTasksStatus()",refresh_ms);
			}
			else
			{
				stop_refresh=false;
				task_running=false;
			}
		}
	}
}



function HTMLEncode(text)
{
	text = text.replace(/&/g, "&amp;") ;
	text = text.replace(/"/g, "&quot;") ;
	text = text.replace(/</g, "&lt;") ;
	text = text.replace(/>/g, "&gt;") ;
	text = text.replace(/'/g, "&#146;") ;

	return text ;
}
function HTMLDecode(text)
{
	text = text.replace(/&amp;/g, "&") ;
	text = text.replace(/&quot;/g, "\"") ;
	text = text.replace(/&lt;/g, "<") ;
	text = text.replace(/&gt;/g, ">") ;
	text = text.replace(/&#146;/g, "'") ;

	return text ;
}

function emptyField(obj)
{
	obj.value='';
}

/* buttons */

function initButton(b)
{
	b.stateIsUp = true;
	b.onmouseover = button_up;
	b.onmouseout = button_up;
	b.onmousedown = button_down;
	b.onmouseup = button_up;
	b.onmouseover();
}
function button_down()
{
	try {
		if(this.stateIsUp)
		{
			var childnode = this.childNodes[0];
			var classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
				classname=classname.replace("-down","");
				childnode.className=classname+"-down";
			}
			childnode = childnode.childNodes[0];
			classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
				classname=classname.replace("-down","");
				childnode.className=classname+"-down";
			}
			childnode = childnode.childNodes[0];
			classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
				classname=classname.replace("-down","");
				childnode.className=classname+"-down";
			}			
			this.stateIsUp = false;
		}
	}
	catch(e) {}
}
function button_up()
{
	try {
		if(!this.stateIsUp)
		{
			var childnode = this.childNodes[0];
			var classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
			  classname=classname.replace("-down","");
			  childnode.className=classname;
			}
			childnode = childnode.childNodes[0];
			classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
			  classname=classname.replace("-down","");
			  childnode.className=classname;
			}
			childnode = childnode.childNodes[0];
			classname=childnode.className;
			if (classname.indexOf("button") == 0)
			{
			  classname=classname.replace("-down","");
			  childnode.className=classname;
			}			
			this.stateIsUp = true;
		}
	}
	catch(e) {}
}

function expandCollapse(caller,parentID,objID)
{
	try {
		var parent=document.getElementById(parentID);
		var nodes = parent.getElementsByTagName("tr");
		if(nodes)
			if (!ec(caller,nodes,objID))
				{
					nodes = parent.getElementsByTagName("div");
					if(nodes)
						ec(caller,nodes,objID);
				}
	}
	catch (e) { 
		raiseError("showHide()",e); 
	}
}
function ec(caller,nodes,objID)
{
	if(nodes)
	{
		var i=0;
		for(;i<nodes.length;i++)
		{
			if(nodes[i].id==objID)
			{
				var obj = nodes[i];
				(obj.style.display=="none") ? obj.style.display="" : obj.style.display="none";
				if(caller && (typeof caller=='object'))
				{						
					if(caller.className.indexOf("-collapsed") > 0)
						caller.className = caller.className.replace("-collapsed","-expanded");
					else if(caller.className.indexOf("-expanded") > 0)
						caller.className = caller.className.replace("-expanded","-collapsed");
				}
				return true;
			}
		}
	}
}

function dosubmit(event,obj)
{ 	
	var code = 0;
	if (Gecko)
		code = e.which;
	else
		code = event.keyCode;
	if (code==13)
	{
		try {
			var submitButton=arguments[2];
			if(submitButton)
				eval("obj.form."+submitButton).click();
			else
				obj.form.submit();
		}
		catch(e) {}
	}
}

function formfocus()
{
	var k=0;
	for(;k<document.forms.length;k++)
	{
		if (document.forms.length > 0)
		{
			var el, type, i = 0, j, els = document.forms[k].elements;
			
			i = 0;
			while (el = els[i++]) 
			{
				j = 0;
				while (type = arguments[j++]) 
					if (el.type && el.type.indexOf(type)!=-1)
					{
						var readonly = false;
						try { 
							if(el.readOnly) readonly = true;
							if(el.disabled) readonly = true;
								
						} catch (e) { continue; }
						if(!readonly)
							try { 
								el.focus();							
								return el.focus();
									
							} catch (e) { continue; }
					}
			}
		}
	}
}

var cancelFormSubmit = false;
var alreadySubmitted = false;

function autosubmit(evt)
{
	try {
		if (Gecko)
			code = evt.which;
		else
			code = window.event.keyCode;
		if (code==13 && this.form && !cancelFormSubmit && !alreadySubmitted) 
		{
			var i=0, el, els = this.form.elements;
			while (el = els[i++])
			{
				if(el.id=='default_submit')
				{
					alreadySubmitted = true;
					if (evt && evt.preventDefault) evt.preventDefault();
					else if (window.event) window.event.returnValue = false;

					if (evt && evt.stopPropagation) evt.stopPropagation();
					else if (window.event) window.event.cancelBubble = true;
						
					return el.click();
				}
			}
		}
	}
	catch(exception) {}
}

function fieldRemover(fid)
{
	//fieldRemover(fieldId,[formObject])
	var field=document.getElementById(fid);
	if(field)
		field.value="";
	else
	{
		if(arguments[1])
		{
			var formObject=arguments[1];
			try {
				eval("document.forms."+formObject.name+"."+fid).value="";
			}
			catch(e) {}
		}
	}
}


/*
com.axemble.vdocportal.components.controls.GridControl functions


baseUrl: navigation entry base url
gcname: GridControl name
*/
function GC__AddFilter(baseUrl, gcname)
{
	var frm = eval("this.document.forms."+gcname);
	if(frm)
	{
		var url = baseUrl+"&_cmp="+gcname;
		if(url.indexOf("?") == -1)
			url += "?";
		else
			url += "&";
		url += "_evt=addfilter&property="+escape(frm._property.value)+"&operator="+frm._operator.value+"&value="+escape(frm._value.value);
		navigate(url);		
	}
}
/*
baseUrl: navigation entry base url
gcname: GridControl name
*/
function GC__SetFilter(baseUrl, gcname)
{
	var frm = eval("this.document.forms."+gcname);
	if(frm)
	{
		var url = baseUrl+"&_cmp="+gcname;
		if(url.indexOf("?") == -1)
			url += "?";
		else
			url += "&";
		url += "_evt=setfilter&property="+escape(frm._property.value)+"&operator="+frm._operator.value+"&value="+escape(frm._value.value);
		navigate(url);		
	}
}
/*
baseUrl: navigation entry base url
gcname: GridControl name
*/
function GC__RemoveFilter(baseUrl, gcname)
{
	//TODO
}
/*
baseUrl: navigation entry base url
gcname: GridControl name
curPgIdx: _curpg field indexOf
[onEnterKey]: optional, execute if event.onKeyPress is Enter key
*/
function GC__GotoPage(baseUrl, gcname, curPgIdx)
{
	var frm = eval("this.document.forms."+gcname);
	if(frm)
	{
		var curPg = 0;
		try {
			curPg = frm._curpg[curPgIdx].value;
		}
		catch(e)	{
			curPg = frm._curpg.value;
		}
		var url = baseUrl+"&_cmp="+gcname;
		if(url.indexOf("?") == -1)
			url += "?";
		else
			url += "&";
		url += "_evt=goto&pg="+curPg;
		navigate(url);		
	}
}

function GC__OnEnterKey_GotoPage(baseUrl, gcname, curPgIdx, e)
{
	var code = 0;
	if (Gecko)
		code = e.which;
	else
		code = event.keyCode;
	if (code==13)
	{
		GC__GotoPage(baseUrl, gcname, curPgIdx);
	}
}

function OnEnterKey_DoExecute(command,e)
{
	var code = 0;
	if (Gecko)
		code = e.which;
	else
		code = event.keyCode;
	if (code==13)
	{
		try {
		eval(command);
		}
		catch(e)	{			
		}
	}
}



/*
baseUrl: navigation entry base url
gcname: GridControl name
curPgIdx: _curpg field indexOf
[onEnterKey]: optional, execute if event.onKeyPress is Enter key
*/
function GC__SetPage(baseUrl, gcname, curPgIdx)
{
	var frm = eval("this.document.forms."+gcname);
	if(frm)
	{
		var pag = 0;
		try {
			pag = frm._pag[curPgIdx].value;
		}
		catch(e)	{
			pag = frm._pag.value;
		}
		var url = baseUrl+"&_cmp="+gcname;
		if(url.indexOf("?") == -1)
			url += "?";
		else
			url += "&";
		url += "_pag="+pag;
		navigate(url);		
	}
}

function GC__OnEnterKey_SetPage(baseUrl, gcname, curPgIdx, e)
{
	var code = 0;
	if (Gecko)
		code = e.which;
	else
		code = event.keyCode;
	if (code==13)
	{
		GC__SetPage(baseUrl, gcname, curPgIdx);
	}
}

function GC__ConfirmAction(message,actionUrl)
{
	if(confirm(message))
	{
		if(actionUrl.indexOf("javascript:")==0)
		{
			actionUrl = actionUrl.substring(11);
			eval(actionUrl);
		}
		else
		{
			navigate(actionUrl);
		}
	}
	else
		return void(0);
}

function cancelMouseEvents()
{
	var a = document.getElementsByTagName('A');
	var i=0;
	for(; i<a.length; i++)
	{
		try {
			a[i].onclick = cancelMouseEvent;
			a[i].onmouseover = cancelMouseOverEvent;
			a[i].onmouseout = cancelMouseEvent;
			a[i].onmousedown = cancelMouseEvent;
			a[i].onmouseup = cancelMouseEvent;
			a[i].style.cursor = "default";
		} catch(e) {}
	}
	
}

function cancelMouseEvent()
{
	return false;
}

function cancelMouseOverEvent()
{
	window.status = '';
	return true;
}

function processForm(f)
{
	try {
		var a = f.getElementsByTagName('A');
		var i=0;
		for(; i<a.length; i++)
		{
			try {
				a[i].onclick = cancelMouseEvent;
				a[i].onmouseover = cancelMouseOverEvent;
				a[i].onmouseout = cancelMouseEvent;
				a[i].onmousedown = cancelMouseEvent;
				a[i].onmouseup = cancelMouseEvent;
				a[i].style.cursor = "wait";
			} catch(e) {}
		}
	} catch(e) {}
}

/* 
 *	Async functions
 */

function Async_xmlHttpRequest()
{
 	var httpRequest = false;
    if (window.XMLHttpRequest) // Mozilla
    {
    	httpRequest = new XMLHttpRequest();
    }
	else if (window.ActiveXObject) // ie
    {
		try
		{
        	httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
            catch (e)
            {
				alert(e);
			}
		}
	}
	else
	{
		alert("[Error] XMLHttpRequest not supported !");
	}
	if (!httpRequest)
    {
    	alert('unable to create XMLHttpRequest !');
        return false;
    }
	return httpRequest;
}

function Async_GETRequest(url, func, param)
{
    var httpRequest = false;
    httpRequest = Async_xmlHttpRequest();
    
	if (!httpRequest)
    	return false;
        
    httpRequest.onreadystatechange = function() { Async_HandleResponse(httpRequest, func, param); };
   	httpRequest.open('GET', url, true);
	httpRequest.send(null);
}

function Async_HandleResponse(httpRequest, func, param)
{
	if (httpRequest.readyState == 4) 
	{
		if (httpRequest.status == 200) 
		{
			func(httpRequest, param);
		}
	}
	else
	{
		return;
	}
}

function Async_POSTRequest(url, rparam, func, param)
{
 	var httpRequest = false;
 	httpRequest = Async_xmlHttpRequest();
            
	if (!httpRequest)
    	return false;

    httpRequest.onreadystatechange = function() { Async_HandleResponse(httpRequest, func, param); };
   	httpRequest.open('POST', url, true);
   	httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	httpRequest.send(rparam);
}

//resize a frame on the same server
function resizeLocalIFrame(frame, contentId)
{
	frame.height = frame.contentWindow.document.getElementById(contentId).scrollHeight + "px";
}
